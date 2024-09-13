/**
 * This is meant to fill it the missing pieces in objects
 * @param value the object that will be updated
 * @param defaultValue The defaultValue that will replace missing fields
 * @returns the merging result of value and defaultValue
 */
export default function fillObject<T extends object>(
  value: T,
  defaultValue: T
) {
  const result = { ...defaultValue };
  const keys = Object.keys(value) as (keyof T)[];
  keys.forEach((key) => {
    if (value[key] !== undefined) {
      if (typeof result[key] === typeof value[key]) {
        result[key] = value[key];
      }
    }
  });
  return result;
}
