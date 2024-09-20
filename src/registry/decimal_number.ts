import isDefined from "@/scripts/isDefined";
import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

export default function decimal_number(arg: FuncArgType) {
  let fixed = 2;
  if (isDefined(arg.sf)) fixed = Number(arg.sf);
  if (isDefined(arg.min) && isDefined(arg.max))
    return Chance.floating({
      min: Number(arg.min),
      max: Number(arg.max),
      fixed,
    });
  if (isDefined(arg.min))
    return Chance.floating({ min: Number(arg.min), fixed });
  if (isDefined(arg.max))
    return Chance.floating({ max: Number(arg.max), fixed });
  return Chance.floating({ fixed });
}
