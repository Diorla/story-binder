import { useEffect } from "react";
import { ExpandedCollection } from "./ContextProps";
import ProjectInfo from "@/types/ProjectInfo";
import addCollection from "@/scripts/add-collection";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useContextState from "@/hooks/useContextState";
import Context from "./Context";
import useApp from "@/context/app/useApp";

async function init(path: string) {
  const data = await window.api.sendMessage({
    type: "read-directory",
    path,
  });
  const { files } = data as { files: string[]; folders: string[] };
  const filteredFiles = files.filter(
    (item) => item !== ".config" && item.includes(APP_FILE_EXT)
  );
  const list = [];
  for (const item of filteredFiles) {
    const data = await window.api.sendMessage({
      type: "read-file",
      path: `${path}/${item}`,
    });
    list.push(JSON.parse(data as string));
  }
  return list;
}

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
  const [selCol, setSelCol] = useContextState("selected-collection", "");
  const [selDoc, setSelDoc] = useContextState("selected-document", "");

  const selectItem = (
    type: "project" | "collection" | "document",
    name: string
  ) => {
    if (type === "project") {
      setSelCol("");
      setSelDoc("");
    } else if (type === "collection") {
      setSelCol(name);
      setSelDoc("");
    } else if (type === "document") {
      setSelDoc(name);
    }
  };
  // const [selected, setSelected] = useContextState<{
  //   type: "project" | "collection" | "document";
  //   name: string;
  // }>("selected-item", {
  //   type: "project",
  //   name: "",
  // });
  // const [expandedCollection, setExpandedCollection] =
  //   useContextState<ExpandedCollection>("expanded-sidebar", {});

  // const updateProject = (currentProject: Partial<ProjectInfo>) => {
  //   setProject({ ...project, ...currentProject });
  // };

  // const createCollection = (collectionName: string) => {
  //   addCollection(workspace, project.name, collectionName).then(
  //     (newCollection) => {
  //       setCollection(
  //         [...collection, newCollection].sort((a, b) => (a > b ? 1 : -1))
  //       );
  //     }
  //   );
  // };

  // const toggleExpanded = (name: string) => {
  //   if (expandedCollection[name]) {
  //     const temp = { ...expandedCollection };
  //     delete temp[name];
  //     setExpandedCollection(temp);
  //     return;
  //   }
  //   window.api
  //     .sendMessage({
  //       type: "read-directory",
  //       path: `${workspace}/${project.name}.${APP_FILE_EXT}/${name}`,
  //     })
  //     .then((res: { files: string[]; folders: string[] }) => {
  //       const files = res.files.filter((item) => item !== ".template");
  //       setExpandedCollection({
  //         ...expandedCollection,
  //         [name]: files,
  //       });
  //     });
  // };

  console.log("collection", collection);
  useEffect(() => {
    init(`${workspace}/${project.name}`).then((list) => {
      setCollection(list);
    });
  }, [project, setCollection, workspace]);

  return (
    <Context.Provider
      value={{
        project,
        collection,
        selectedCollection: selCol,
        selectedDocument: selDoc,
        selectItem,
        // updateProject,
        // createCollection,
        // selected,
        // setSelected,
        // expandedCollection,
        // toggleExpanded,
      }}
    >
      {children}
    </Context.Provider>
  );
}
