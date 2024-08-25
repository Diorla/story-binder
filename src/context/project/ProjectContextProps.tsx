import ProjectInfo from "@/types/ProjectInfo";

export default interface ProjectContextProps {
  project: ProjectInfo;
  updateProject: (args: Partial<ProjectInfo>) => void;
  createCollection: (collectionName: string) => void;
  // collection: string[];
  // toggleCollection: (args: string) => void;
  // expandedTree: {
  //   [collection: string]: string[];
  // };
  // document: {
  //   name: string;
  //   content: string;
  // };
}
