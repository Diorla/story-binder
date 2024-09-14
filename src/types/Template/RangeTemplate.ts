export default interface RangeTemplate {
  type: "range";
  value: {
    min: number;
    max: number;
  };
  minValue: number;
  maxValue: number;
  isInteger: boolean;
}
