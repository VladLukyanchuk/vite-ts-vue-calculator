<template>
  <div class="main">
    <div class="content">
      <Form @submitForm="calculate" @resetForm="result = null" />
      <Transition>
        <div v-if="result" class="total-block">
          <div ref="total" class="total-block__head">
            <ul>
              <li>
                <WhiteBlock class="">
                  <h3>Final Balance:</h3>
                  <h2>
                    {{
                      getNumberWithSpaces(currentBalance) +
                      " " +
                      result.currency
                    }}
                  </h2>
                </WhiteBlock>
              </li>
              <li>
                <WhiteBlock class="green">
                  <h3>Total Percent:</h3>
                  <h2>
                    {{
                      getNumberWithSpaces(currentPercent) +
                      " " +
                      result.currency
                    }}
                  </h2>
                </WhiteBlock>
              </li>
              <li>
                <WhiteBlock class="blue">
                  <h3>Total Refills:</h3>
                  <h2>
                    {{
                      getNumberWithSpaces(currentRefills) +
                      " " +
                      result.currency
                    }}
                  </h2>
                </WhiteBlock>
              </li>
              <li>
                <WhiteBlock class="purple">
                  <h3>Initial Amount:</h3>
                  <h2>
                    {{
                      getNumberWithSpaces(currentInitial) +
                      " " +
                      result.currency
                    }}
                  </h2>
                </WhiteBlock>
              </li>
            </ul>
          </div>
          <div class="total-block__main">
            <Chart :key="chartUpdate" :data="result" />
          </div>
        </div>
      </Transition>
    </div>
    <Table :data="result" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { currencyOptions } from "../constants/constants";
import { Form as FormType, Result, Series } from "../utils/types";
import { useChartStore } from "../stores/ChartStore";
import { getNumberWithSpaces } from "../utils/getNumberWithSpaces.ts";
import { getCurrencySymbol } from "../utils/getCurrencySymbol.ts";

import WhiteBlock from "./UI/WhiteBlock.vue";
import Chart from "./UI/Chart.vue";
import Table from "./UI/Table.vue";
import Form from "./Form.vue";

const chartStore = useChartStore();

const total = ref<HTMLDivElement | null>(null);
const result = ref<Result | null>(null);

async function calculate(form: FormType) {
  result.value = calculateCompoundInterest(form);

  if (!result.value) {
    return;
  }

  setTimeout(() => {
    if (total.value) {
      total.value.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 100);

  animateCountUp(currentBalance, result.value.finalBalance);
  animateCountUp(currentRefills, result.value.totalRefills);
  animateCountUp(currentPercent, result.value.totalPercent);
  animateCountUp(currentInitial, result.value.initialSum);

  chartStore.options.xaxis.categories = result.value.yearsArray;

  chartUpdate.value++;
}

const animateCountUp = (variable: any, end: number) => {
  if (!result.value) return;
  // How long you want the animation to take, in ms
  const animationDuration = 1500;
  // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
  const frameDuration = 1000 / 60;
  // Use that to calculate how many frames we need to complete the animation
  const totalFrames = Math.round(animationDuration / frameDuration);
  // An ease-out function that slows the count as it progresses
  const easeOutQuad = (t: number) => t * (2 - t);
  let frame = 0;
  const countTo = end;
  // Start the animation running 60 times per second
  const counter = setInterval(() => {
    frame++;
    // Calculate our progress as a value between 0 and 1
    // Pass that value to our easing function to get our
    // progress on a curve
    const progress = easeOutQuad(frame / totalFrames);
    // Use the progress value to calculate the current count
    const currentCount = Math.round(countTo * progress);

    // If the current count has changed, update the element
    if (variable.value !== currentCount) {
      variable.value = currentCount;
    }

    // If we’ve reached our last frame, stop the animation
    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
};

const currentBalance = ref<number>(0);
const currentRefills = ref<number>(0);
const currentPercent = ref<number>(0);
const currentInitial = ref<number>(0);

const chartUpdate = ref<number>(1);

function calculateCompoundInterest(form: FormType): Result | null {
  const { initialAmount, interestAccrual, replenishments, years } = form;
  let { sum: replenishSum, period: replenishPeriod } = replenishments;
  const { percent, period: accrualPeriod } = interestAccrual;

  const hasReplenish = replenishSum && replenishPeriod;

  if (!initialAmount || !percent || !accrualPeriod || !years) {
    return null;
  }

  const result: Result = {
    finalBalance: initialAmount,
    totalRefills: 0,
    totalPercent: 0,
    currency: "",
    yearsArray: [],
    series: [],
    initialSum: form.initialAmount,
  };
  const refillsObject: Series = {
    name: "Total Refills",
    data: [],
  };
  const percentObject: Series = {
    name: "Total Percent",
    data: [],
  };
  const startSumObj: Series = {
    name: "Initial Amount",
    data: [],
  };
  let refillsSum = 0;

  let replenishPeriodByAccrual = -1;
  if (hasReplenish) {
    replenishPeriodByAccrual =
      accrualPeriod > replenishPeriod ? accrualPeriod / replenishPeriod : -1;
  }

  // Обчислення суми з основної суми та відсотків за складним процентом
  for (let i = 0; i < years; i++) {
    result.yearsArray.push(i + 1);
    startSumObj.data.push(Math.round(form.initialAmount));

    for (let j = 1; j <= accrualPeriod; j++) {
      let percentForChart = 0;

      const currentInterest = result.finalBalance * (percent / 100);
      result.totalPercent += currentInterest;
      result.finalBalance += currentInterest;
      percentForChart += currentInterest;

      if (hasReplenish && replenishPeriodByAccrual !== -1) {
        if (Number.isInteger(j / replenishPeriodByAccrual)) {
          refillsSum += replenishSum;
          result.totalRefills += replenishSum;
          refillsObject.data.push(Math.round(result.totalRefills));
        }
        result.totalPercent += refillsSum * (percent / 100);
        refillsSum += refillsSum * (percent / 100);
        percentForChart += refillsSum * (percent / 100);
      }

      if (hasReplenish && replenishPeriodByAccrual === -1) {
        result.totalRefills += replenishSum * (replenishPeriod / accrualPeriod);
        refillsSum += replenishSum * (replenishPeriod / accrualPeriod);
        refillsObject.data.push(Math.round(result.totalRefills));
        result.totalPercent += refillsSum * (percent / 100);
        refillsSum += refillsSum * (percent / 100);
        percentForChart += refillsSum * (percent / 100);
      }

      percentObject.data.push(Math.round(result.totalPercent));
    }
  }

  result.finalBalance = Math.round(result.finalBalance + refillsSum);
  result.totalRefills = Math.round(result.totalRefills);
  result.totalPercent = Math.round(result.totalPercent);
  result.currency = getCurrencySymbol(form.currency, currencyOptions);
  result.series = [startSumObj, refillsObject, percentObject];

  chartStore.changeDataLabelsVisibility(years < 25);

  return result;
}
</script>
