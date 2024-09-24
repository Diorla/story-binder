import Fuse from "fuse.js";
import countries from "./country-list";
import chance from "chance";
import { FuncArgType } from "../RegistryFunc";

export default async function country(arg: FuncArgType) {
  const { region = "", ethnicity = "" } = arg as {
    region: string;
    ethnicity: string;
  };

  const Chance = new chance();
  const fuse = new Fuse(countries, {
    keys: ["region", "ethnicities"],
    threshold: 0.2,
    isCaseSensitive: false,
  });

  const results = fuse.search({
    $or: [{ ethnicities: ethnicity }, { region }],
  });
  const countryResult =
    results.length === 0 ? countries : results.map((item) => item.item);

  const country = Chance.weighted(
    countryResult,
    countryResult.map((item) => item.population)
  );

  return country.country;
}
