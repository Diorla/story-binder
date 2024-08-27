import PromptProps from "@/types/PromptProps";
import { dialog } from "electron";

export default function openPrompt(args: PromptProps) {
  return dialog.showMessageBoxSync({
    title: args.title,
    message: args.message,
    buttons: ["Cancel", "Leave"],
  });
}
