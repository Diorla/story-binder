type RangeTemplate = {
  type: "range";
  value: [number, number];
  minValue: number;
  maxValue: number;
  isInteger: boolean;
};
export default RangeTemplate;
