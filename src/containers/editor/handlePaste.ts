import { Editor } from "@tiptap/core";
import convertImageToDataUri from "./convertImageToDataUri";

export default function handlePaste(editor: Editor) {
  return (ev: ClipboardEvent) => {
    const dT = ev.clipboardData;
    const file = dT?.files[0];

    if (file) {
      convertImageToDataUri(file, (dataUri) => {
        editor.commands.setImage({
          src: dataUri as string,
          alt: file.name,
        });
      });
    }
  };
}
