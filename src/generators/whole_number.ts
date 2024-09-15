import chance from "chance";

/**
 * This generates a random whole number between the min and max values
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @returns {number} A random whole number between the min and max values
 * @example
 * whole_number(); // 7871890915328
 * whole_number(10, 100); // 84
 */
export default function whole_number(min?: number, max?: number): number {
  return new chance().integer({ min, max });
}
