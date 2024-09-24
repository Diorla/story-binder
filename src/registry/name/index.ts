import fetchName from "./fetch-name";
import Chance from "chance";
import { FuncArgType } from "../RegistryFunc";
import filterCountry from "./filterCountry";

const chance = new Chance();

// TODO: Add origin list to handle full name
// for now, we will stick with behindthename code e.g. yor instead of yoruba
// but later on, I will create a checkup list based on this link:
// https://www.behindthename.com/api/appendix1.php
export default async function generateName(arg: FuncArgType) {
  const {
    gender = "male",
    region = "",
    origin = "",
    country = "",
  } = arg as {
    gender: "male" | "female";
    country: string;
    region: string;
    origin: string;
  };

  let eth = origin;

  if (!eth) {
    const filteredCountries = filterCountry({ region, country });
    const selectedCountry = chance.weighted(
      filteredCountries,
      filteredCountries.map((item) => item.population)
    );

    const ethnicity = chance.pickone(selectedCountry.ethnicities);
    eth = ethnicity;
  }

  const { names } = await fetchName("male", eth);

  if (gender.toLocaleLowerCase() === "female") {
    const { names } = await fetchName(gender, eth);
    if (names?.length) {
      const [firstName, otherName] = chance.pickset(names, 3);
      const lastName = chance.pickone(names);
      return `${firstName} ${otherName} ${lastName}`;
    }
    return "N/A";
  }

  if (names?.length) {
    const [firstName, otherName, lastName] = chance.pickset(names, 3);
    return `${firstName} ${otherName} ${lastName}`;
  }

  return "N/A";
}
