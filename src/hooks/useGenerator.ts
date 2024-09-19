import Generator from "@/scripts/Generator";
import { useEffect, useState } from "react";

export default function useGenerator(template: string) {
  const [formattedText, setFormattedText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const refresh = () => {
    const generatedObj = new Generator(template);
    const formattedText = generatedObj.getFormattedText();
    const generatedText = generatedObj.generateContent();
    setFormattedText(formattedText);
    setGeneratedText(generatedText);
  };

  useEffect(() => {
    const generatedObj = new Generator(template);
    const formattedText = generatedObj.getFormattedText();
    const generatedText = generatedObj.generateContent();
    setFormattedText(formattedText);
    setGeneratedText(generatedText);
  }, [template]);

  return {
    formattedText,
    generatedText,
    refresh,
  };
}
