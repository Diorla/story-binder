import React, { useEffect, useState } from "react";
import useApp from "../app/useApp";
import logError from "@/scripts/logError";
import { ProjectListContext } from "./ProjectListContext";

export default function ProjectListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    userInfo: { workspace },
  } = useApp();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    window.api
      ?.sendMessage({
        type: "read-directory",
        path: workspace,
      })
      .then((value: { files: string[]; folders: string[] }) => {
        setProjects(value.folders);
      })
      .catch((err) => {
        logError("Home", "useEffect", err);
      });
  }, [workspace]);

  const reload = () => {
    window.api
      ?.sendMessage({
        type: "read-directory",
        path: workspace,
      })
      .then((value: { files: string[]; folders: string[] }) => {
        setProjects(value.folders);
      })
      .catch((err) => {
        logError("Home", "useEffect", err);
      });
  };

  return (
    <ProjectListContext.Provider
      value={{
        projects,
        reload,
      }}
    >
      {children}
    </ProjectListContext.Provider>
  );
}
