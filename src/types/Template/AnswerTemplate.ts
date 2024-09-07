import DateTemplate from "./DateTemplate";
import MultiSelectTemplate from "./MultiSelectTemplate";
import NumberTemplate from "./NumberTemplate";
import RangeTemplate from "./RangeTemplate";
import ReferenceTemplate from "./ReferenceTemplate";
import SelectTemplate from "./SelectTemplate";
import TextTemplate from "./TextTemplate";
import TimeTemplate from "./TimeTemplate";
import UnitTemplate from "./UnitTemplate";

type AnswerTemplate =
  | DateTemplate
  | MultiSelectTemplate
  | NumberTemplate
  | RangeTemplate
  | ReferenceTemplate
  | SelectTemplate
  | TextTemplate
  | TimeTemplate
  | UnitTemplate;

export default AnswerTemplate;
