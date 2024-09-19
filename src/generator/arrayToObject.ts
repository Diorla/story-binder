/**
 * maps ["key=value", "key1=value1", ] to { key: value, key1: value1 }
 * @param arr contains =
 * @returns
 */
export function arrayToObject(arr: string[]): Record<string, string | number> {
  return arr.reduce(
    (acc, item) => {
      const [key, value] = item.split("="); // Split the string by '='
      const num = Number(value);
      if (key && value) acc[key] = Number.isNaN(num) ? value : num;
      return acc;
    },
    {} as Record<string, string | number>
  );
}
