import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

export default function country(arg: FuncArgType) {
  if (arg.continent === "europe")
    return Chance.country({ region: "Europe", full: true });
  return Chance.country({ full: true });
}
