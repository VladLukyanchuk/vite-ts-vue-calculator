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
          :options="currencyOptions"
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
          :options="periodOptions"
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
          :options="periodOptions"
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
      <FormButton type="danger">Reset</FormButton>
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
import { periodOptions } from "../constants/constants";
import { z } from "zod";
import { currencyOptions } from "../constants/constants";

const emit = defineEmits(["submitForm"]);

//STATE
const form = ref<Form>({
  initialAmount: 100,
  currency: 1,
  replenishments: {
    sum: 0,
    period: 1,
  },
  interestAccrual: {
    percent: 10,
    period: 1,
  },
  years: 5,
});

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

//SUBMIT
async function handleSubmit() {
  await validate();

  if (!isValid.value) {
    return;
  }

  emit("submitForm", form.value);
}
</script>
