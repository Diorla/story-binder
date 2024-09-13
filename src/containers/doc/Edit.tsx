import useApp from "@/context/app/useApp";
import Editor from "../editor";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useRouter from "@/context/router/useRouter";
import Doc from "@/types/Doc";
import { useEffectOnce } from "react-use";
import { useState } from "react";
import JSONParse from "@/scripts/JSONParse";
import Template from "@/types/Template";
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
    userInfo: { workspace },
  } = useApp();
  const { params } = useRouter<{ dir: string[] }>();

  useEffectOnce(() => {
    const docId = params.dir.join("/");
    const path = `${workspace}/${docId}.${APP_FILE_EXT}`;

    window.api
      .sendMessage({
        type: "read-file",
        path,
      })
      .then((data) => {
        setDoc(validateDoc(data as Doc));
      });
  });

  const docId = params.dir.join("/");
  const path = `${workspace}/${docId}.${APP_FILE_EXT}`;

  if (!doc.id) return null;

  const template: Template = JSONParse(doc?.template);
  if (template?.type === "form") return <div>Returning form edit</div>;
  return (
    <Editor
      initialContent={doc.content || template?.content || ""}
      updateFn={(content) => writeDoc({ ...doc, content }, path)}
    />
  );
}
