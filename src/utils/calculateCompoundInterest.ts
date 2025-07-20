import { currencyOptions } from "../constants/constants";
import { getCurrencySymbol } from "./getCurrencySymbol";
import { Form, Result, Series } from "./types";

export function calculateCompoundInterest(form: Form): Result | null {
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

  return result;
}
