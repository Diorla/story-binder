import useApp from "@/context/app/useApp";
import Editor from "../editor";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useRouter from "@/context/router/useRouter";
import Doc from "@/types/Doc";
import { useEffectOnce } from "react-use";
import { useState } from "react";
import validateDoc from "@/schema/validateDoc";
import writeDoc from "@/scripts/writeDoc";

export default function Edit() {
  const [doc, setDoc] = useState<Doc>({
    name: "",
    id: "",
    content: "",
    note: "",
    template: "",
  });

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
        if (validateDoc(data as Doc)) setDoc(data as Doc);
      });
  });

  if (!doc.id) return null;

  return (
    <Editor
      initialContent={doc.content || doc.template}
      updateFn={(content) => writeDoc({ ...doc, content }, path)}
    />
  );
}
