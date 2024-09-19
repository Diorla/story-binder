import VARIABLE_REGEX from "@/constants/VARIABLE_REGEX";
import FnDict from "./FnDict";
import FnList from "./FnList";
import generateFunctionList from "./generateFunctionList";
import VarDict from "./VarDict";
import FUNCTION_REGEX from "@/constants/FUNCTION_REGEX";
import generateFunctionDict from "./generateFunctionDict";
import generateVariableDict from "./generateVariableDict";
import pruneFnDict from "./pruneFnDict";
import generateFnDictValues from "./generateFnDictValues";

/**
 * @class Generator
 * This is the class that will generate the template
 */
export default class Generator {
  private template: string;
  private fnDict: FnDict;
  private varDict: VarDict;
  private fnList: FnList;
  private formattedText: string;

  constructor(template: string) {
    this.template = template;
    this.fnDict = {};
    this.varDict = {};
    this.fnList = [];
    this.formattedText = template
      .replaceAll(VARIABLE_REGEX, (val) => `<b>${val}</b>`)
      .replaceAll(FUNCTION_REGEX, (val) => `<b>${val}</b>`);
    this.generate();
  }

  private generateFunctionList = () => {
    this.fnList = generateFunctionList(this.template);
  };

  private generateFunctionDict = () => {
    this.fnDict = generateFunctionDict(this.fnList);
  };

  private generateVariableDict = () => {
    this.varDict = generateVariableDict(this.fnDict);
  };

  private pruneFnDict = (): void => {
    this.fnDict = pruneFnDict(this.fnDict, this.varDict);
  };

  private generate = () => {
    this.generateFunctionList();
    this.generateFunctionDict();
    this.generateVariableDict();
    this.pruneFnDict();
  };

  generateFnDictValues = () => {
    this.fnDict = generateFnDictValues(this.fnDict, this.varDict);
  };

  getFormattedText = () => this.formattedText;

  generateContent = () => {
    this.generateFnDictValues();
    let newTemplate = this.template;
    Object.values(this.fnDict).forEach((item) => {
      newTemplate = newTemplate.replaceAll(
        item.template,
        `<b>${item.value.toString()}</b>`
      );
    });
    Object.keys(this.varDict).forEach((key) => {
      const variableName = `~[${key}]~`;
      newTemplate = newTemplate.replaceAll(
        variableName,
        `<b>${this.varDict[key]}</b>`
      );
    });
    newTemplate = newTemplate.replaceAll(
      FUNCTION_REGEX,
      (val) => `<span class="err">${val}</span>`
    );
    newTemplate = newTemplate.replaceAll(
      VARIABLE_REGEX,
      (val) => `<span class="err">${val}</span>`
    );
    return newTemplate;
  };
}
