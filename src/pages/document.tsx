import DocumentContainer from "@/containers/Document";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import DocumentInfo from "@/types/DocumentInfo";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function DocumentPage() {
  const { updateDir } = useApp();
  const { params } = useRouter<DocumentInfo>();
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    updateDir("documentId", params.id);
    setLoading(false);
  });

  if (loading) return <div>Loading</div>;
  return <DocumentContainer />;
}
