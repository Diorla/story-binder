import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import validateDoc from "@/schema/validateDoc";
import validateTemplate from "@/schema/validateTemplate";
import JSONParse from "@/scripts/JSONParse";
import Doc from "@/types/Doc";
import Template from "@/types/Template";
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

  const {
    userInfo: { projectPath },
  } = useApp();
  const { params } = useRouter<{ dir: string[] }>();

  useEffectOnce(() => {
    const docId = params.dir.join("/");
    const path = `${projectPath}/${docId}.${APP_FILE_EXT}`;

    window.api
      .sendMessage({
        type: "read-file",
        path,
      })
      .then((data) => {
        setDoc(validateDoc(data as Doc));
      });
  });
  if (!doc.id) return null;

  const template: Template = validateTemplate(JSONParse(doc.template));
  if (template?.type === "form") return <div>Previewing form</div>;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: doc.content || "" }}
      className="preview"
    />
  );
}
