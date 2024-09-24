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

  generateFnDictValues = async () => {
    const fnDict = await generateFnDictValues(this.fnDict, this.varDict);
    this.fnDict = { ...fnDict };
    return fnDict;
  };

  getFormattedText = () => this.formattedText;

  generateContent = async () => {
    const fnDict = await this.generateFnDictValues();
    let newTemplate = this.template;

    Object.values(fnDict).forEach((item) => {
      newTemplate = newTemplate.replaceAll(
        item.template,
        `<span class="mod">${item.value.toString()}</span>`
      );
    });

    Object.keys(this.varDict).forEach((key) => {
      const variableName = `~[${key}]~`;
      newTemplate = newTemplate.replaceAll(
        variableName,
        `<span class="mod">${this.varDict[key]}</span>`
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
