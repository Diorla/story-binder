import Fuse from "fuse.js";
import countries from "../country/country-list";

const fuse = new Fuse(countries, {
  keys: ["country", "region"],
  threshold: 0.2,
  isCaseSensitive: false,
});

export default function filterCountry({
  country,
  region,
}: {
  country: string;
  region: string;
}) {
  const results = fuse.search({
    $or: [{ region }, { country }],
  });
  if (results.length === 0) {
    return countries;
  }
  // console.log("results", results);
  return results.map((item) => item.item);
}
