import React, { useEffect, useState } from "react";
import logError from "@/scripts/logError";
import Context from "./Context";
import useApp from "@/context/app/useApp";

export default function Provider({ children }: { children: React.ReactNode }) {
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
    <Context.Provider
      value={{
        projects,
        reload,
      }}
    >
      {children}
    </Context.Provider>
  );
}
