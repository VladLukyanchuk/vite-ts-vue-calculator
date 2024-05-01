import { FormSelectOption } from "../utils/types";

export interface CurrencyOption extends FormSelectOption {
  symbol: string;
}

export const currencyOptions: CurrencyOption[] = [
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

export const periodOptions: FormSelectOption[] = [
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
