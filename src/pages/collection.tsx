import Collection from "@/containers/collection";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import CollectionInfo from "@/types/CollectionInfo";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function CollectionPage() {
  const { updateDir } = useApp();
  const { params } = useRouter<CollectionInfo>();
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    updateDir("collectionName", params.id);
    setLoading(false);
  });

  if (loading) return <div>Loading</div>;
  return <Collection />;
}
