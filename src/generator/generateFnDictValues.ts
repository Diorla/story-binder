import FnDict from "./FnDict";
import generateValue from "./generateValue";
import VarDict from "./VarDict";

export default function generateFnDictValues(fnDict: FnDict, varDict: VarDict) {
  const tempFnDict = { ...fnDict };
  Object.values(fnDict)
    .filter((item) => !item.dep.length)
    .forEach((item) => {
      const newItem = generateValue(item, varDict);
      tempFnDict[newItem.id] = newItem;
    });
  Object.values(fnDict)
    .filter((item) => item.dep.length)
    .forEach((item) => {
      const formattedItem = { ...item };
      const { args } = formattedItem;
      Object.entries(args).forEach(([key, value]) => {
        if (value.toString().startsWith("[")) {
          const variable =
            varDict[value.toString().replace("[", "").replace("]", "")];
          if (variable) formattedItem.args[key] = variable;
        }
      });
      const newItem = generateValue(formattedItem, varDict);
      tempFnDict[newItem.id] = newItem;
    });
  return tempFnDict;
}
