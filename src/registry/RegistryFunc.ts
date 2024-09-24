export type FuncArgType = {
  [key: string]: string | number;
};

type RegistryFunc = (arg: FuncArgType) => Promise<string | number>;

export default RegistryFunc;
