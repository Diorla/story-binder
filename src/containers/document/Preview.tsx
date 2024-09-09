import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import DocumentInfo from "@/types/DocumentInfo";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function Preview() {
  const [document, setDocument] = useState<DocumentInfo>({
    name: "",
    id: "",
    content: "",
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
  if (!document.id) return null;
  if (document.template?.type === "form") return <div>Previewing form</div>;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: document.content || "" }}
      className="preview"
    />
  );
}
