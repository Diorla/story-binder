export default interface MultiSelectTemplate {
  type: "multi-select";
  value: string[];
  minCount: number;
  maxCount: number;
}
