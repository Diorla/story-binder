import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import validateDoc from "@/schema/validateDoc";
import Doc from "@/types/Doc";
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

  return (
    <div
      dangerouslySetInnerHTML={{ __html: doc.content || "" }}
      className="preview"
    />
  );
}
