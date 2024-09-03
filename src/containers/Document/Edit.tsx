import useApp from "@/context/app/useApp";
import Editor from "../editor";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useRouter from "@/context/router/useRouter";
import DocumentInfo from "@/types/DocumentInfo";
import { useEffectOnce } from "react-use";
import { useState } from "react";

export default function Edit() {
  const [document, setDocument] = useState<DocumentInfo>({
    name: "",
    id: "",
    content: "",
    template: null,
    note: "",
  });

  const {
    userInfo: { workspace },
  } = useApp();
  const { params } = useRouter<{ dir: string[] }>();

  useEffectOnce(() => {
    const documentId = params.dir.join("/");
    const path = `${workspace}/${documentId}.${APP_FILE_EXT}`;

    window.api
      .sendMessage({
        type: "read-file",
        path,
      })
      .then((data) => {
        setDocument(data as DocumentInfo);
      });
  });

  const writeDocument = (content: string) => {
    const documentId = params.dir.join("/");
    const path = `${workspace}/${documentId}.${APP_FILE_EXT}`;

    window.api.sendMessage({
      type: "write-file",
      path: `${path}`,
      content: { ...document, content },
    });
  };

  if (!document.id) return null;

  if (document?.template?.type === "form")
    return <div>Returning form edit</div>;
  return (
    <Editor
      initialContent={document.content || document?.template?.template || ""}
      updateFn={(data) => writeDocument(data)}
    />
  );
}
