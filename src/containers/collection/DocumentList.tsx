import { Box } from "@mui/material";
import DocumentCard from "./DocumentCard";
import FolderConfig from "@/types/FolderConfig";
import DocumentInfo from "@/types/DocumentInfo";
import useApp from "@/context/app/useApp";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function DocumentList({
  collection,
}: {
  collection: FolderConfig;
}) {
  const { dir, refresh } = useApp();

  const writeDocument = (data: DocumentInfo) => {
    const tempCollection = { ...collection };
    const tempDocument = tempCollection?.document[data.id] || {};
    tempCollection.document[data.id] = { ...tempDocument, ...data };
    window.api
      .sendMessage({
        type: "write-file",
        path: `${dir.projectPath}/${dir.collectionName}.${APP_FILE_EXT}`,
        content: JSON.stringify(tempCollection, null, 2),
      })
      .then(refresh);
  };

  const deleteDocument = (id: string) => {
    const tempCollection = { ...collection };
    delete tempCollection.document[id];

    window.api
      .sendMessage({
        type: "write-file",
        path: `${dir.projectPath}/${dir.collectionName}.${APP_FILE_EXT}`,
        content: JSON.stringify(tempCollection, null, 2),
      })
      .then(refresh);
  };

  const documentObj = collection.document || {};
  const documents: DocumentInfo[] = Object.keys(documentObj).map((item) => {
    return {
      ...documentObj[item],
    };
  });
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {documents.map((item) => (
        <DocumentCard
          key={item.id}
          item={item}
          writeDocument={writeDocument}
          deleteDocument={deleteDocument}
        />
      ))}
    </Box>
  );
}
