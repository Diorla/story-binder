import chance from "chance";

/**
 * This generates a random decimal number between the min and max values
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @param {number} precision How many decimal places to include
 * @returns {number} A random decimal number between the min and max values
 * @example
 * decimal_number(); // -2548116490.9152
 * decimal_number(10, 100); // 28.90
 */
export default function decimal_number(
  min?: number,
  max?: number,
  precision?: number
): number {
  return new chance().floating({ min, max, fixed: precision });
}
