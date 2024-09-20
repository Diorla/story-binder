export default function isDefined(value: unknown) {
  if (typeof value === "undefined") return false;
  if (value === null) return false;
  return true;
}
