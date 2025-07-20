<template>
  <WhiteBlock @keyup.enter="handleSubmit">
    <template #title> Form </template>
    <div class="divider">
      <div class="divider__content">1</div>
      <div class="divider__line"></div>
    </div>
    <div class="flex-row">
      <FormLabel
        required
        text="Initial amount"
        :error="getError('initialAmount')"
      >
        <TextInput
          v-model="form.initialAmount"
          :error="!!getError('initialAmount')"
        />
      </FormLabel>
      <FormLabel required text="Currency" :error="getError('currency')">
        <FormSelect
          :error="!!getError('currency')"
          :options="CURRENCY_OPTIONS"
          v-model="form.currency"
        />
      </FormLabel>
    </div>
    <div class="divider">
      <div class="divider__content">2</div>
      <div class="divider__line"></div>
    </div>
    <div class="flex-row">
      <FormLabel text="Replenishment" :error="getError('replenishments.sum')">
        <TextInput
          :error="!!getError('replenishments.sum')"
          v-model="form.replenishments.sum"
          @focus="clearZeroOnFocus"
        />
      </FormLabel>
      <FormLabel text="Period" :error="getError('replenishments.period')">
        <FormSelect
          label="Period"
          :error="!!getError('replenishments.period')"
          :options="PERIOD_OPTIONS"
          v-model="form.replenishments.period"
        />
      </FormLabel>
    </div>
    <div class="divider">
      <div class="divider__content">3</div>
      <div class="divider__line"></div>
    </div>
    <div class="flex-row">
      <FormLabel
        required
        text="Percent (%)"
        :error="getError('interestAccrual.percent')"
      >
        <TextInput
          :error="!!getError('interestAccrual.percent')"
          v-model="form.interestAccrual.percent"
        />
      </FormLabel>
      <FormLabel
        required
        text="Period"
        :error="getError('interestAccrual.period')"
      >
        <FormSelect
          :error="!!getError('interestAccrual.period')"
          label="Period"
          :options="PERIOD_OPTIONS"
          v-model="form.interestAccrual.period"
        />
      </FormLabel>
    </div>
    <div class="divider">
      <div class="divider__content">4</div>
      <div class="divider__line"></div>
    </div>
    <FormLabel required text="Number of years" :error="getError('years')">
      <TextInput
        :error="!!getError('years')"
        v-model="form.years"
        label="Number of years"
      />
    </FormLabel>

    <template #buttons>
      <FormButton @click="handleReset" type="danger">Reset</FormButton>
      <FormButton @click="handleSubmit">Calculate</FormButton>
    </template>
  </WhiteBlock>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Form } from "../utils/types";
import WhiteBlock from "./UI/WhiteBlock.vue";
import useValidation from "../utils/useValidation";
import TextInput from "./UI/TextInput.vue";
import FormButton from "./UI/FormButton.vue";
import FormSelect from "./UI/FormSelect.vue";
import FormLabel from "./UI/FormLabel.vue";
import { clearZeroOnFocus } from "../utils/clearZeroOnFocus";
import { BASE_FORM, PERIOD_OPTIONS } from "../constants/constants";
import { z } from "zod";
import { CURRENCY_OPTIONS } from "../constants/constants";
import { cloneDeep } from "lodash";

const emit = defineEmits(["submitForm", "resetForm"]);

//STATE
const form = ref<Form>(cloneDeep(BASE_FORM));

//VALIDATION
const InterestAccrualSchema = z.object({
  percent: z.number().gte(1),
  period: z.number({ invalid_type_error: "Required field" }),
});
const FormSchema = z.object({
  initialAmount: z.number().gte(1),
  currency: z.number(),
  interestAccrual: InterestAccrualSchema,
  years: z.number().gte(1),
});

const { validate, isValid, getError } = useValidation(FormSchema, form, {
  mode: "lazy",
});

//RESET
function handleReset() {
  form.value = cloneDeep(BASE_FORM);

  emit("resetForm");
}

//SUBMIT
async function handleSubmit() {
  await validate();

  if (!isValid.value) {
    return;
  }

  emit("submitForm", form.value);
}
</script>
