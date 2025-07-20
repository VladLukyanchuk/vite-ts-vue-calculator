import { Form, FormSelectOption } from "../utils/types";

export interface CurrencyOption extends FormSelectOption {
  symbol: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  {
    id: 1,
    label: "USD",
    symbol: "$",
  },
  {
    id: 2,
    label: "EUR",
    symbol: "€",
  },
  {
    id: 3,
    label: "UAH",
    symbol: "₴",
  },
];

export const PERIOD_OPTIONS: FormSelectOption[] = [
  {
    id: 1,
    label: "Every Year",
  },
  {
    id: 2,
    label: "Every Six Months",
  },
  {
    id: 4,
    label: "Every Quarter",
  },
  {
    id: 12,
    label: "Every Month",
  },
];

export const BASE_FORM: Form = {
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
};
