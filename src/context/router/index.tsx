import { useEffect, useState } from "react";
import RouterContext from "./RouterContext";
import Router from "./Router";
import Path from "@/types/Path";
import Layout from "@/containers/layout";

export default function RouterProvider() {
  const [path, setPath] = useState<Path>("home");
  const [history, setHistory] = useState([]);
  const [params, setParams] = useState(null);

  useEffect(() => {
    const db = localStorage.getItem("route");
    if (db) {
      const { _lastPath, params } = JSON.parse(db);
      setPath(_lastPath);
      setParams(params);
    }
  }, []);

  function navigate<T>(path: Path, params?: T) {
    setPath(path);
    setHistory([...history, path]);
    localStorage.setItem("route", JSON.stringify({ _lastPath, params }));
    if (params) setParams(params);
  }

  const goBack = () => {
    const previousPath = history[history.length - 2];
    if (previousPath) {
      setPath(previousPath);
      setHistory(history.slice(0, -1));
      localStorage.setItem(
        "route",
        JSON.stringify({ _lastPath: previousPath, params })
      );
    } else {
      setPath("home");
      localStorage.setItem(
        "route",
        JSON.stringify({ _lastPath: "home", params })
      );
    }
  };

  const _lastPath = history[history.length - 1] || "";

  return (
    <RouterContext.Provider value={{ navigate, goBack, _lastPath, params }}>
      <Layout>
        <Router path={path} />
      </Layout>
    </RouterContext.Provider>
  );
}
