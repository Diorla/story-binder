// This only support 24 hour format

export default interface TimeTemplate {
  type: "time";
  // hour, minute, seconds
  value: number;
  minValue: number; //
  maxValue: number; //
}
