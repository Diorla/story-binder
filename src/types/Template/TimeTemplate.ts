// This only support 24 hour format

type TimeTemplate = {
  type: "time";
  // hour, minute, seconds
  value: number;
  minValue: number; //
  maxValue: number; //
};
export default TimeTemplate;
