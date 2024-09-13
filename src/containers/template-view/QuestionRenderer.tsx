import useTemplateContext from "./useTemplateContext";
import FormQuestion from "@/types/Template/FormQuestion";
import TextInput from "./inputs/TextInput";
import AnswerTemplate from "@/types/Template/AnswerTemplate";
import NumberInput from "./inputs/NumberInput";
import SelectInput from "./inputs/SelectInput";
import MultipleSelectInput from "./inputs/MultipleSelectInput";
import DateInput from "./inputs/DateInput";
import TimeInput from "./inputs/TimeInput";
import RangeInput from "./inputs/RangeInput";
import UnitInput from "./inputs/UnitInput";
import ReferenceInput from "./inputs/ReferenceInput";
import JSONParse from "@/scripts/JSONParse";

export default function QuestionRenderer({
  questionItem,
}: {
  questionItem: FormQuestion;
}) {
  const { register, form } = useTemplateContext();

  const content = JSONParse<FormQuestion>(form.content);
  const submit = (value: FormQuestion) => {
    if (content === null) return;
    const newContent: FormQuestion = {
      ...content,
      [questionItem.id]: value,
    };
    register("content").onUpdate(JSON.stringify(newContent));
  };

  const answer = JSONParse<AnswerTemplate>(questionItem.answer);
  if (answer === null) return;
  if (answer.type === "text")
    return <TextInput questionItem={questionItem} submit={submit} />;
  if (answer.type === "number")
    return <NumberInput questionItem={questionItem} submit={submit} />;
  if (answer.type === "select")
    return <SelectInput questionItem={questionItem} submit={submit} />;
  if (answer.type === "multi-select")
    return <MultipleSelectInput questionItem={questionItem} submit={submit} />;
  if (answer.type === "date")
    return <DateInput questionItem={questionItem} submit={submit} />;
  if (answer.type === "time")
    return <TimeInput questionItem={questionItem} submit={submit} />;
  if (answer.type === "range")
    return <RangeInput questionItem={questionItem} submit={submit} />;
  if (answer.type === "unit")
    return <UnitInput questionItem={questionItem} submit={submit} />;
  if (answer.type === "reference")
    return <ReferenceInput questionItem={questionItem} submit={submit} />;
}
