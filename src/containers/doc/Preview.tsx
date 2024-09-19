import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import useGenerator from "@/hooks/useGenerator";
import validateDoc from "@/schema/validateDoc";
import writeDoc from "@/scripts/writeDoc";
import Doc from "@/types/Doc";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function Preview() {
  const [doc, setDoc] = useState<Doc>({
    name: "",
    id: "",
    content: "",
    note: "",
    template: "",
  });

  // const [generated, setGenerated] = useState(false);
  const { generatedText, refresh } = useGenerator(doc.content || doc.template);
  const {
    userInfo: { projectPath },
  } = useApp();
  const { params } = useRouter<{ dir: string[] }>();
  const docId = params.dir.join("/");
  const path = `${projectPath}/${docId}.${APP_FILE_EXT}`;

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path,
      })
      .then((data) => {
        setDoc(validateDoc(data as Doc));
      });
  });

  const save = () => {
    writeDoc({ ...doc, content: generatedText }, path);
  };

  if (!doc.id) return null;

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={refresh}>Generate</Button>
        <Button onClick={save}>Save</Button>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: generatedText || doc.content }}
        className="preview"
      />
    </div>
  );
}
