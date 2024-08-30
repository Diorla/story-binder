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
  collection: { name: string; note: string; id: string }[];
  selectedCollection: string;
  selectedDocument: string;
  selectItem: (
    type: "project" | "collection" | "document",
    name: string
  ) => void;
  createCollection: (arg: { name: string; note: string; id?: string }) => void;
  // updateProject: (args: Partial<ProjectInfo>) => void;
  // createCollection: (collectionName: string) => void;
  // selected: Selected;
  // setSelected: (args: Selected) => void;
  // expandedCollection: ExpandedCollection;
  // toggleExpanded: (collection: string) => void;
}
