import isDefined from "@/scripts/isDefined";
import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

export default function decimal_number(arg: FuncArgType) {
  if (isDefined(arg.min) && isDefined(arg.max))
    return Chance.floating({ min: Number(arg.min), max: Number(arg.max) });
  if (isDefined(arg.min)) return Chance.floating({ min: Number(arg.min) });
  if (isDefined(arg.max)) return Chance.floating({ max: Number(arg.max) });
  return Chance.floating();
}
