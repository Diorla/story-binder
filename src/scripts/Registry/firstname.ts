import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

export default function firstname(arg: FuncArgType) {
  if (arg.gender?.toString().toLowerCase() === "male")
    return Chance.first({ gender: "male" });
  return Chance.first({ gender: "female" });
}
