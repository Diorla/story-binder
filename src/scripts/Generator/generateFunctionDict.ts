import Registry from "../Registry";
import { arrayToObject } from "./arrayToObject";
import FnDict from "./FnDict";
import FnItem from "./FnItem";

export const parseFn = (template: string, index: number): FnItem | null => {
  const noSpaceTemplate = template.replace(/\s/g, "");

  // all functions are case insensitive, it doesn't matter what they put in
  const functionName = noSpaceTemplate
    .split("(")[0]
    .replaceAll("~", "")
    .toLocaleLowerCase();
  if (!Registry[functionName]) return null;

  const id = (Math.random() * (index + 1)).toString(36).substring(7);
  const params = noSpaceTemplate.split("(")[1].split(")")[0];
  let args = {};
  let dep: string[] = [];
  if (params) {
    args = arrayToObject(params.split(","));
    dep = Object.values(args)
      .map((item) =>
        typeof item === "string" && item.startsWith("[")
          ? item.replace(/[[\]]/gi, "")
          : ""
      )
      .filter((item) => item);
  }
  const extra = noSpaceTemplate.split(")[")[1];
  let identifier = "";
  if (extra) {
    identifier = extra.replaceAll("]~", "");
  }

  const result: FnItem = {
    id,
    index,
    template,
    functionName,
    args,
    value: "",
    identifier,
    dep,
  };
  return result;
};

export default function generateFunctionDict(fnList: string[]): FnDict {
  /**
   * This will generate the dictionary of functions
   * It should also check against registry to ensure that function exist
   */
  const fnDict: FnDict = {};
  fnList.forEach((item, index) => {
    const result = parseFn(item, index);
    if (result) fnDict[result.id] = result;
  });
  return fnDict;
}
