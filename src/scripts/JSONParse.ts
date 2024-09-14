export default function JSONParse<T extends object>(value: string): T | null {
  if (value) return JSON.parse(value);
  return null;
}
