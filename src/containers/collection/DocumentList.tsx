import { Box } from "@mui/material";
import useLocalState from "@/hooks/useLocalState";
import useRouter from "@/context/router/useRouter";
import { useEffectOnce } from "react-use";
import useApp from "@/context/app/useApp";
import readDocumentList from "@/scripts/readDocumentList";
import DocumentInfo from "@/types/DocumentInfo";
import DocumentCard from "./DocumentCard";

export default function DocumentList() {
  const {
    userInfo: { workspace },
  } = useApp();
  const { params } = useRouter<{ dir: string[] }>();
  const path = `${workspace}/${params.dir.join("/")}`;
  const [documentList, setDocumentList] = useLocalState<DocumentInfo[]>(
    path,
    []
  );

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-directory",
        path,
      })
      .then((data: { files: string[]; folders: string[] }) => {
        readDocumentList(data.files, path).then((list) => {
          setDocumentList(list);
        });
      });
  });

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {documentList.map((item) => (
        <DocumentCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
