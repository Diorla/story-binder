// This only support 24 hour format

export default interface TimeTemplate {
  type: "time";
  // hour, minute, seconds
  value: string;
  minValue: string; //
  maxValue: string; //
}
