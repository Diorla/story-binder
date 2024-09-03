import { Box } from "@mui/material";
import CollectionCard from "./CollectionCard";
import useLocalState from "@/hooks/useLocalState";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";
import FolderConfig from "@/types/FolderConfig";
import { useEffectOnce } from "react-use";
import readCollectionList from "./readCollectionList";

export default function CollectionList() {
  const { params } = useRouter<ProjectInfo>();
  const [collection, setCollection] = useLocalState<FolderConfig[]>(
    params.path,
    []
  );

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-directory",
        path: `${params.path}`,
      })
      .then((data: { files: string[]; collections: string[] }) => {
        readCollectionList(data.files, params.path).then((list) => {
          setCollection(list);
        });
      });
  });

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {collection.map((item) => (
        <CollectionCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
