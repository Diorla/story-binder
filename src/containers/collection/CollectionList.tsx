import { Box } from "@mui/material";
import CollectionCard from "@/components/CollectionCard";
import useLocalState from "@/hooks/useLocalState";
import useRouter from "@/context/router/useRouter";
import FolderConfig from "@/types/FolderConfig";
import { useEffectOnce } from "react-use";
import readCollectionList from "@/scripts/readCollectionList";
import useApp from "@/context/app/useApp";

export default function CollectionList() {
  const {
    userInfo: { workspace },
  } = useApp();
  const { params } = useRouter<{ dir: string[] }>();
  const path = `${workspace}/${params.dir.join("/")}`;
  const [collection, setCollection] = useLocalState<FolderConfig[]>(path, []);

  useEffectOnce(() => {
    readCollectionList(path).then((list) => {
      setCollection(list);
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
