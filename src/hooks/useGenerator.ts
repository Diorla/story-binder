import Generator from "@/generator";
import { useEffect, useState } from "react";

const placeholder =
  "<div class='text-center'>Click <b><u>GENERATE</u></b> to see how it works</div>";
export default function useGenerator(template: string) {
  const [formattedText, setFormattedText] = useState("");
  const [generatedText, setGeneratedText] = useState(placeholder);

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
    setGeneratedText(placeholder);
  }, [template]);

  return {
    formattedText,
    generatedText,
    refresh,
  };
}
