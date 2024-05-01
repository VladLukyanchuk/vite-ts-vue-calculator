export interface TextInputProps {
  required?: boolean;
  modelValue?: number | null;
  error?: boolean;
}
export interface DataProps {
  data: Result | null;
}
export interface FormSelectProps {
  options: FormSelectOption[];
  modelValue?: number | null;
  error?: boolean;
}
export interface ButtonProps {
  type?: "danger" | "blue";
}
export interface FormSelectOption {
  id: number;
  label: string;
}
export interface Form {
  initialAmount: number;
  currency: number;
  replenishments: {
    sum: number | null;
    period: number | null;
  };
  interestAccrual: {
    percent: number;
    period: number | null;
  };
  years: number;
}
export interface Result {
  finalBalance: number;
  totalRefills: number;
  totalPercent: number;
  currency: string;
  yearsArray: number[];
  series: Series[];
  initialSum: number;
}

export interface Series {
  name: string;
  data: number[];
}
