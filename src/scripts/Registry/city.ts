import Chance from "./Chance";
import { FuncArgType } from "./RegistryFunc";

const country: { [key: string]: string } = {
  Nigeria: "Abuja",
  USA: "Washington DC",
  Ghana: "Accra",
  SouthAfrica: "Pretoria",
};

export default function city(arg: FuncArgType): string | number {
  const argList = Object.keys(arg);
  if (argList.includes("country")) return country[arg.country] || "Abuja";
  return Chance.city();
}
