import { useProject } from "./useProject";
import ProjectView from "./ProjectView";

export default function Project() {
  const { selectedCollection, selectedDocument } = useProject();

  if (selectedDocument.id) return <div>This is document</div>;
  if (selectedCollection.id) return <div>This is collection</div>;
  return <ProjectView />;
}
