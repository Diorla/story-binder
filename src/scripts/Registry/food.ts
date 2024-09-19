import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

export default function food(arg: FuncArgType) {
  if (arg?.cuisine === "european") return Chance.word();
  return "Jollof rice";
}
