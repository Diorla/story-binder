import { Box, Button } from "@mui/material";
import Picker from "@/components/Picker";
import { useState } from "react";
import useTemplateContext from "./useTemplateContext";
import generateQuestionnaire from "./generateQuestionnaire";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";

export default function AddQuestion({ page }: { page: number }) {
  const [selected, setSelected] = useState("text");
  const { form, register } = useTemplateContext();

  const list = [
    { label: "Text", value: "text" },
    { label: "Figure", value: "number" },
    { label: "Select", value: "select" },
    { label: "Select multiple", value: "multi-select" },
    { label: "Date", value: "date" },
    { label: "Time", value: "time" },
    { label: "Range", value: "range" },
    { label: "Measurement", value: "unit" },
    { label: "Reference", value: "reference" },
  ];

  const updateTemplate = (questionnaire: TemplateFormContentType) => {
    const content = form.content as unknown as TemplateFormContentType;
    register("content").onUpdate(
      JSON.stringify({
        ...content,
        [questionnaire.id]: questionnaire,
      })
    );
  };

  const addQuestion = () => {
    const length = Object.keys(form.content).length;
    const questionnaire = generateQuestionnaire(selected, length, page);
    updateTemplate(questionnaire);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 24,
        backgroundColor: "white",
        width: "100%",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "calc(100vw - 72px)",
        }}
      >
        <Picker
          value={selected}
          onUpdate={(value) => setSelected(value)}
          label="Select question type"
          list={list}
        />
        <Button sx={{ mb: 0.5 }} onClick={addQuestion}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
