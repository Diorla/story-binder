import FnDict from "./FnDict";
import VarDict from "./VarDict";

export default function pruneFnDict(fnDict: FnDict, varDict: VarDict) {
  const tempFnDict = { ...fnDict };
  const variableList = Object.keys(varDict);
  Object.values(fnDict).forEach((item) => {
    if (!item.dep.every((item) => variableList.includes(item)))
      delete tempFnDict[item.id];
  });
  return tempFnDict;
}
