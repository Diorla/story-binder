import icon from "@/assets/icon";
import { Prompt } from "@/types/Payload";
import { dialog, nativeImage } from "electron";

export default function openPrompt(args: Prompt) {
  const {
    data: { title, message, accept = "OK", cancel = "Cancel" },
  } = args;

  const iconImage = nativeImage.createFromDataURL(icon);
  return dialog.showMessageBoxSync({
    title,
    message,
    buttons: [cancel, accept],
    noLink: true,
    icon: iconImage,
  });
}
