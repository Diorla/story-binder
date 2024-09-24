import isDefined from "@/scripts/isDefined";
import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

export default async function whole_number(arg: FuncArgType) {
  if (isDefined(arg.min) && isDefined(arg.max))
    return Chance.integer({ min: Number(arg.min), max: Number(arg.max) });
  if (isDefined(arg.min)) return Chance.integer({ min: Number(arg.min) });
  if (isDefined(arg.max)) return Chance.integer({ max: Number(arg.max) });
  return Chance.integer();
}
