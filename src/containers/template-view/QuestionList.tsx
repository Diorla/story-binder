import { Box } from "@mui/material";
import QuestionRenderer from "./QuestionRenderer";
import useTemplateContext from "./useTemplateContext";
import JSONParse from "@/scripts/JSONParse";
import validateFormQuestion from "@/schema/validateFormQuestion";
import FormQuestion from "@/types/Template/FormQuestion";

export default function QuestionList({ page }: { page: number }) {
  const { form } = useTemplateContext();

  const content = JSONParse<{ [id: string]: FormQuestion }>(form?.content);

  if (!content) return null;
  const keyList = Object.keys(content);

  const questionList: FormQuestion[] = keyList.map((key) =>
    validateFormQuestion(content[key])
  );

  return (
    <Box sx={{ mb: 4 }}>
      {questionList
        .filter((item) => item.page === page)
        .sort((prevItem, nextItem) => prevItem.order - nextItem.order)
        .map((item) => (
          <QuestionRenderer key={item.id} questionItem={item} />
        ))}
    </Box>
  );
}
