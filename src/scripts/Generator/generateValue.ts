import Registry from "../Registry";
import FnItem from "./FnItem";
import VarDict from "./VarDict";

export default function generateValue(fnItem: FnItem, varDict: VarDict) {
  const item = { ...fnItem };
  const func = Registry[fnItem.functionName];
  if (func) {
    const value = func(fnItem.args);
    if (fnItem.identifier) varDict[fnItem.identifier] = value;
    item.value = value;
  }
  return item;
}
