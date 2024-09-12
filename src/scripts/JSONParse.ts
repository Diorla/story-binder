export default function JSONParse(value: string) {
  if (value) return JSON.parse(value);
  return null;
}
