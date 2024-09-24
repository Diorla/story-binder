import Generator from "@/generator";
import { useEffect, useState } from "react";

export default function useGenerator(template: string) {
  const [formattedText, setFormattedText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const refresh = async () => {
    const generatedObj = new Generator(template);
    const formattedText = generatedObj.getFormattedText();
    const generatedText = generatedObj.generateContent();
    setFormattedText(formattedText);
    setGeneratedText(await generatedText);
  };

  useEffect(() => {
    const generatedObj = new Generator(template);
    const formattedText = generatedObj.getFormattedText();
    setFormattedText(formattedText);
    const generateText = async () => {
      const generatedText = generatedObj.generateContent();
      setGeneratedText(await generatedText);
    };
    generateText();
  }, [template]);

  return {
    formattedText,
    generatedText,
    refresh,
  };
}
