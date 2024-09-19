export default interface VarDict {
  // identifier is the function identifier e.g. [cont] will be { cont: "africa" }
  [identifier: string]: string | number;
}
