import { useEffect } from "react";
// import { ExpandedCollection } from "./ContextProps";
import ProjectInfo from "@/types/ProjectInfo";
// import addCollection from "@/scripts/add-collection";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useContextState from "@/hooks/useContextState";
import Context from "./Context";
import useApp from "@/context/app/useApp";
import { v4 } from "uuid";
import init from "./init";

const base = {
  id: "",
  name: "",
};

export default function ProjectProvider({
  children,
  projectInfo,
}: {
  children: React.ReactNode;
  projectInfo: ProjectInfo;
}) {
  const {
    userInfo: { workspace },
  } = useApp();

  const [project, setProject] = useContextState("project-info", projectInfo);
  const [collection, setCollection] = useContextState("project-collection", []);
  const [selCol, setSelCol] = useContextState("selected-collection", base);
  const [selDoc, setSelDoc] = useContextState("selected-document", base);

  const selectItem = (args: {
    type: "project" | "collection" | "document";
    name: string;
    id: string;
  }) => {
    const { type } = args;
    if (type === "project") {
      setSelCol(base);
      setSelDoc(base);
    } else if (type === "collection") {
      setSelCol(args);
      setSelDoc(base);
    } else if (type === "document") {
      setSelDoc(args);
    }
  };

  const createCollection = (arg: {
    name: string;
    note: string;
    id?: string;
  }) => {
    const fileName = arg.id || v4();
    const path = fileName.endsWith(APP_FILE_EXT)
      ? `${project.path}/${fileName}`
      : `${project.path}/${fileName}.${APP_FILE_EXT}`;
    window.api.sendMessage({
      type: "write-file",
      content: JSON.stringify({ ...arg, id: fileName, path }),
      path,
    });
    init(project.path).then((list) => {
      setCollection(list);
    });
  };

  const deleteCollection = (id: string) => {
    window.api.sendMessage({
      type: "delete-file",
      path: `${project.path}/${id}`,
    });
    init(project.path).then((list) => {
      setCollection(list);
    });
  };
  useEffect(() => {
    init(project.path).then((list) => {
      setCollection(list);
    });
  }, [project, setCollection, workspace]);

  console.log("selCol", selCol);
  return (
    <Context.Provider
      value={{
        project,
        collection,
        selectedCollection: selCol,
        selectedDocument: selDoc,
        selectItem,
        createCollection,
        deleteCollection,
        setProject,
      }}
    >
      {children}
    </Context.Provider>
  );
}
