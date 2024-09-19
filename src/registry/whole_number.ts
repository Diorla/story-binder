import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

export default function whole_number(arg: FuncArgType) {
  if (arg.min && arg.max)
    return Chance.integer({ min: Number(arg.min), max: Number(arg.max) });
  if (arg.min) return Chance.integer({ min: Number(arg.min) });
  if (arg.max) return Chance.integer({ max: Number(arg.max) });
  return Chance.integer();
}
