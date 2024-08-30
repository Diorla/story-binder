import { useProject } from "./useProject";
import ProjectView from "./ProjectView";

export default function Project() {
  const { selectedCollection, selectedDocument } = useProject();

  if (selectedDocument) return <div>This is document</div>;
  if (selectedCollection) return <div>This is collection</div>;
  return <ProjectView />;
}
