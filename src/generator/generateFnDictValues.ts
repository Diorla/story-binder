import FnDict from "./FnDict";
import generateValue from "./generateValue";
import VarDict from "./VarDict";

export default async function generateFnDictValues(
  fnDict: FnDict,
  varDict: VarDict
) {
  const tempFnDict = { ...fnDict };
  const withoutDep = Object.values(fnDict).filter((item) => !item.dep.length);
  const withDep = Object.values(fnDict).filter((item) => item.dep.length);

  for await (const item of withoutDep) {
    const newItem = await generateValue(item, varDict);
    tempFnDict[newItem.id] = newItem;
  }

  for await (const item of withDep) {
    const formattedItem = { ...item };
    const { args } = formattedItem;
    Object.entries(args).forEach(([key, value]) => {
      if (value.toString().toLocaleLowerCase().startsWith("[")) {
        const variable =
          varDict[value.toString().replace("[", "").replace("]", "")];
        if (variable) formattedItem.args[key] = variable;
      }
    });
    const newItem = await generateValue(formattedItem, varDict);
    tempFnDict[newItem.id] = newItem;
  }

  return tempFnDict;
}
