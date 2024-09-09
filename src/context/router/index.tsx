import { useEffect } from "react";
import RouterContext from "./RouterContext";
import Router from "./Router";
import Path from "@/types/Path";
import Layout from "@/containers/layout";
import ErrorBoundary from "@/containers/error-boundary";
import useLocalState from "@/hooks/useLocalState";
import useApp from "../app/useApp";
import deepEqual from "deep-equal";

export default function RouterProvider() {
  const [path, setPath] = useLocalState<Path>("current-path", "home");
  const [history, setHistory] = useLocalState<Path[]>("path history", []);
  const [params, setParams] = useLocalState<object | null>(
    "route params",
    null
  );
  const [error, setError] = useLocalState<Error | null>("route error", null);
  const { refresh } = useApp();

  const _lastPath = history[history.length - 1];
  useEffect(() => {
    const db = localStorage.getItem("route");
    if (db) {
      const { params, path, history } = JSON.parse(db);
      if (path) setPath(path);
      if (params) setParams(params);
      setHistory(history || []);
    }
  }, [setHistory, setParams, setPath]);

  function navigate<T>(path: Path, newParams?: T) {
    if (_lastPath === path && deepEqual(params, newParams)) return;
    const confirmNavigation = () => {
      localStorage.clear();
      setParams(null);
      setError(null);
      setPath(path);
      const newHistory = [...history, path];
      setHistory(newHistory);
      localStorage.setItem(
        "route",
        JSON.stringify({ params: newParams, path, history: newHistory })
      );
      refresh();
      if (newParams) setParams(newParams);
    };

    confirmNavigation();
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

  const value = {
    navigate,
    goBack,
    params,
    _lastPath,
  };

  return (
    <RouterContext.Provider value={value}>
      <Layout>
        <ErrorBoundary setError={setError}>
          <Router path={path} error={error} />
        </ErrorBoundary>
      </Layout>
    </RouterContext.Provider>
  );
}
