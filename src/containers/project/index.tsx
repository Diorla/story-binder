import { useProject } from "./project-view/useProject";
import ProjectView from "./project-view";
import CollectionView from "./collection-view";
import CollectionProvider from "./collection-view/Provider";

export default function Project() {
  const { selectedCollection, selectedDocument, project } = useProject();

  if (selectedDocument.id) return <div>This is document</div>;
  if (selectedCollection.id) {
    return (
      <CollectionProvider
        collectionPath={`${project.path}/${selectedCollection.id}`}
      >
        <CollectionView />
      </CollectionProvider>
    );
  }
  return <ProjectView />;
}
