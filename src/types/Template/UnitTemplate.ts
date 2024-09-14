export default interface UnitTemplate {
  type: "unit";
  value: number;
  unit: string;
  minValue: number;
  maxValue: number;
  isInteger: boolean;
}
