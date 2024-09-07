export function numeric(arg: string | number, isInteger?: boolean) {
  let value = 0;
  if (typeof arg === "number") value = arg;
  else {
    if (isInteger) value = parseInt(arg);
    else value = parseFloat(arg);
  }
  return Number.isNaN(value) ? 0 : value;
}
