import { Box } from "@mui/material";
import CollectionView from "./CollectionView";
import { useEffect } from "react";
import useRouter from "@/context/router/useRouter";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import FolderConfig from "@/types/FolderConfig";
import { defaultCollection } from "./defaultCollection";
import { CollectionContext } from "./CollectionContext";
import readCollectionList from "@/scripts/readCollectionList";
import readDocumentList from "@/scripts/readDocumentList";
import DocumentInfo from "@/types/DocumentInfo";

export default function Collection() {
  const { params } = useRouter<{ dir: string[] }>();
  const {
    userInfo: { workspace },
  } = useApp();

  const path = params.dir.join("/");
  const currentDir = `${workspace}/${path}`;
  const [collection, setCollection] = useLocalState<FolderConfig>(
    "collection",
    defaultCollection
  );

  const [collectionList, setCollectionList] = useLocalState<FolderConfig[]>(
    path,
    []
  );

  const [documentList, setDocumentList] = useLocalState<DocumentInfo[]>(
    path,
    []
  );

  useEffect(() => {
    readDocumentList(currentDir).then((list) => {
      setDocumentList(list);
    });
  }, [currentDir, setDocumentList]);
  useEffect(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${currentDir}/.config`,
      })
      .then((data) => setCollection(data as FolderConfig));
  }, [currentDir, setCollection, workspace]);

  useEffect(() => {
    readCollectionList(currentDir).then((list) => {
      setCollectionList(list);
    });
  }, [currentDir, setCollectionList]);

  const reload = () => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${currentDir}/.config`,
      })
      .then((data) => setCollection(data as FolderConfig));
    readCollectionList(currentDir).then((list) => {
      setCollectionList(list);
    });
    readDocumentList(currentDir).then((list) => {
      setDocumentList(list);
    });
  };
  return (
    <CollectionContext.Provider
      value={{ collection, currentDir, collectionList, reload, documentList }}
    >
      <Box>
        <CollectionView />
      </Box>
    </CollectionContext.Provider>
  );
}
