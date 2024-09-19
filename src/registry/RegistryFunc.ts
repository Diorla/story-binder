export type FuncArgType = {
  [key: string]: string | number;
};

type RegistryFunc = (arg: FuncArgType) => string | number;

export default RegistryFunc;
