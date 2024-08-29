import { useEffect } from "react";
import RouterContext from "./RouterContext";
import Router from "./Router";
import Path from "@/types/Path";
import Layout from "@/containers/layout";
import ErrorBoundary from "@/containers/error-boundary";
import useLocalState from "@/hooks/useLocalState";

export default function RouterProvider() {
  const [path, setPath] = useLocalState<Path>("current-path", "home");
  const [history, setHistory] = useLocalState("path history", []);
  const [params, setParams] = useLocalState("route params", null);
  const [error, setError] = useLocalState("route error", null);
  const [isDirty, setIsDirty] = useLocalState("route is dirty", false);

  useEffect(() => {
    const db = localStorage.getItem("route");
    if (db) {
      const { params, path, history } = JSON.parse(db);
      if (path) setPath(path);
      if (params) setParams(params);
      setHistory(history || []);
    }
  }, [setHistory, setParams, setPath]);

  function navigate<T>(path: Path, params?: T) {
    const confirmNavigation = () => {
      setError(null);
      setPath(path);
      const newHistory = [...history, path];
      setHistory(newHistory);
      localStorage.setItem(
        "route",
        JSON.stringify({ params, path, history: newHistory })
      );
      if (params) setParams(params);
    };

    // if (isDirty) {
    //   const prompt = async () => {
    //     const navigateAway = await window.dialog.prompt({
    //       title: "Unsaved changes",
    //       message: "You have unsaved changes. Are you sure you want to leave?",
    //     });
    //     return navigateAway;
    //   };
    //   prompt().then((res) => {
    //     if (res) {
    //       confirmNavigation();
    //       setIsDirty(false);
    //     }
    //   });
    //   return;
    // } else {
    //   confirmNavigation();
    // }
  }

  const goBack = () => {
    const previousPath = history[history.length - 2];
    if (previousPath) {
      setPath(previousPath);
      const newHistory = history.slice(0, -1);
      setHistory(history.slice(0, -1));
      localStorage.setItem(
        "route",
        JSON.stringify({ params, path, history: newHistory })
      );
    } else {
      setPath("home");
      localStorage.setItem(
        "route",
        JSON.stringify({ params, path, history: ["home"] })
      );
    }
  };

  const _lastPath = history[history.length - 1] || "";

  return (
    <RouterContext.Provider
      value={{
        navigate,
        goBack,
        _lastPath,
        params,
        isDirty,
        setIsDirty,
      }}
    >
      <Layout>
        <ErrorBoundary setError={setError}>
          <Router path={path} error={error} />
        </ErrorBoundary>
      </Layout>
    </RouterContext.Provider>
  );
}
