import Folder from "@/containers/folder";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import CollectionInfo from "@/types/CollectionInfo";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function FolderPage() {
  const { updateDir } = useApp();
  const { params } = useRouter<CollectionInfo>();
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    updateDir("folderName", params.id);
    setLoading(false);
  });

  if (loading) return <div>Loading</div>;
  return <Folder />;
}
