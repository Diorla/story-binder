import Collection from "@/containers/collection";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import FolderConfig from "@/types/FolderConfig";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function CollectionPage() {
  const { updateDir } = useApp();
  const { params } = useRouter<FolderConfig>();
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    updateDir("collectionName", params.id);
    setLoading(false);
  });

  if (loading) return <div>Loading</div>;
  return <Collection />;
}
