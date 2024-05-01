export function getNumberWithSpaces(x: number): string {
  if (typeof x !== "number") {
    return "0";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
