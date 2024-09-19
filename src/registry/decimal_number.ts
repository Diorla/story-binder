import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

export default function decimal_number(arg: FuncArgType) {
  if (arg.min && arg.max)
    return Chance.floating({ min: Number(arg.min), max: Number(arg.max) });
  if (arg.min) return Chance.floating({ min: Number(arg.min) });
  if (arg.max) return Chance.floating({ max: Number(arg.max) });
  return Chance.floating();
}
