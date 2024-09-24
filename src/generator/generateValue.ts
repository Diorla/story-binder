import Registry from "../registry";
import FnItem from "./FnItem";
import VarDict from "./VarDict";

export default async function generateValue(fnItem: FnItem, varDict: VarDict) {
  const item = { ...fnItem };
  const func = Registry[fnItem.functionName];
  if (func) {
    const value = await func(fnItem.args);
    if (fnItem.identifier) varDict[fnItem.identifier] = value;
    item.value = value;
  }
  return item;
}
