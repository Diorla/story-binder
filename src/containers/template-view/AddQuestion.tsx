import { Button } from "@mui/material";
import Picker from "@/components/Picker";
import { useState } from "react";
import useTemplateContext from "./useTemplateContext";
import generateQuestionnaire from "./generateQuestionnaire";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import JSONParse from "@/scripts/JSONParse";

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

  const content = JSONParse<{ [id: string]: TemplateFormContentType }>(
    form?.content
  );
  const updateTemplate = (questionnaire: TemplateFormContentType) => {
    register("content").onUpdate(
      JSON.stringify({
        ...content,
        [questionnaire.id]: questionnaire,
      })
    );
  };

  const addQuestion = () => {
    const length = content ? Object.keys(content).length : 0;
    const questionnaire = generateQuestionnaire(selected, length, page);
    updateTemplate(questionnaire);
  };

  return (
    <div className="sticky bottom-8 bg-white w-full z-10 mt-2">
      <div className="flex flex-row items-start">
        <Picker
          value={selected}
          onUpdate={(value) => setSelected(value)}
          label="Select question type"
          list={list}
        />
        <div className="mt-1">
          <Button onClick={addQuestion}>Add</Button>
        </div>
      </div>
    </div>
  );
}
