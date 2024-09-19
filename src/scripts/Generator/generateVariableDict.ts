import FnDict from "./FnDict";
import VarDict from "./VarDict";

export default function generateVariableDict(fnDict: FnDict) {
  const varDict: VarDict = {};
  Object.keys(fnDict).forEach((key) => {
    const item = fnDict[key].identifier;
    if (item) varDict[item] = fnDict[key].value;
  });
  return varDict;
}
