import ProjectInfo from "@/types/ProjectInfo";

export interface Selected {
  type: "project" | "collection" | "document";
  name: string;
}

export interface ExpandedCollection {
  [collection: string]: string[];
}

export default interface ProjectContextProps {
  project: ProjectInfo;
  updateProject: (args: Partial<ProjectInfo>) => void;
  createCollection: (collectionName: string) => void;
  collection: string[];
  selected: Selected;
  setSelected: (args: Selected) => void;
  expandedCollection: ExpandedCollection;
  toggleExpanded: (collection: string) => void;
}
