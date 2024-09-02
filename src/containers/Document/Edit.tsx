import useApp from "@/context/app/useApp";
import CollectionInfo from "@/types/CollectionInfo";
import Editor from "../editor";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function Edit({ collection }: { collection: CollectionInfo }) {
  const { dir } = useApp();

  const documents = collection?.document || {};
  const document = documents[dir.documentId];

  const updateDocument = (data: string) => {
    const tempCollection = { ...collection };
    const tempDocument = tempCollection?.document[dir.documentId] || {};
    tempCollection.document[dir.documentId] = {
      ...document,
      ...tempDocument,
      content: data,
    };

    window.api.sendMessage({
      type: "write-file",
      path: `${dir.projectPath}/${dir.collectionName}.${APP_FILE_EXT}`,
      content: JSON.stringify(tempCollection, null, 2),
    });
  };

  if (!document) return null;

  if (document?.template?.type === "form")
    return <div>Returning form edit</div>;
  return (
    <Editor
      initialContent={document.content || document.template.template || ""}
      updateFn={(data) => updateDocument(data)}
    />
  );
}
