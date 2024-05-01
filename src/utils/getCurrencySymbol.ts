import { CurrencyOption } from "../constants/constants";

export function getCurrencySymbol(
  id: number,
  options: CurrencyOption[]
): string {
  const result = options.find((option) => option.id === id);
  return result ? result.symbol : "";
}
