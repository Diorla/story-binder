import useTemplateContext from "./useTemplateContext";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import TextInput from "./inputs/TextInput";
import AnswerTemplate from "@/types/Template/AnswerTemplate";
import TextTemplate from "@/types/Template/TextTemplate";
import NumberInput from "./inputs/NumberInput";
import NumberTemplate from "@/types/Template/NumberTemplate";

export default function QuestionRenderer({
  questionItem,
}: {
  questionItem: TemplateFormContentType<AnswerTemplate>;
}) {
  const { register, form } = useTemplateContext();

  const submit = (value: TemplateFormContentType<AnswerTemplate>) => {
    if (typeof form.content !== "object") return;
    const { content } = form;
    register("content").onUpdate({ ...content, [questionItem.id]: value });
  };

  if (questionItem.answer.type === "text")
    return (
      <TextInput
        questionItem={questionItem as TemplateFormContentType<TextTemplate>}
        submit={submit}
      />
    );
  if (questionItem.answer.type === "number")
    return (
      <NumberInput
        questionItem={questionItem as TemplateFormContentType<NumberTemplate>}
        submit={submit}
      />
    );
}
