import { Box } from "@mui/material";
import QuestionRenderer from "./QuestionRenderer";
import useTemplateContext from "./useTemplateContext";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import AnswerTemplate from "@/types/Template/AnswerTemplate";

export default function QuestionList({ page }: { page: number }) {
  const { form } = useTemplateContext();

  const content = form?.content as {
    [id: string]: TemplateFormContentType<AnswerTemplate>;
  };

  const keyList = Object.keys(content);

  return (
    <Box sx={{ mb: 4 }}>
      {keyList
        .filter((id: string) => content[id].page === page)
        .sort(
          (prevId: string, nextId) =>
            content[prevId].order - content[nextId].order
        )
        .map((id) => (
          <QuestionRenderer key={id} questionItem={content[id]} />
        ))}
    </Box>
  );
}
