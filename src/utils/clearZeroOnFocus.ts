export function clearZeroOnFocus(ev: FocusEvent): void {
  const target = ev.target as HTMLInputElement;

  if (target && target.value === "0") {
    target.value = "";
  }
}
