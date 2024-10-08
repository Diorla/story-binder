import Path from "@/types/Path";
import { ReactElement } from "react";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import CreateProjectPage from "@/pages/create-project";
import ProjectPage from "@/pages/project";
import FolderPage from "@/pages/folder";
import Templates from "@/pages/templates";
import CreateTemplatePage from "@/pages/create-template";
import DocPage from "@/pages/doc";

const ROUTES: { path: Path; element: ReactElement }[] = [
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "create-project",
    element: <CreateProjectPage />,
  },
  {
    path: "templates",
    element: <Templates />,
  },
  {
    path: "help",
    element: <NotFound />,
  },
  {
    path: "trash",
    element: <NotFound />,
  },
  {
    path: "settings",
    element: <NotFound />,
  },
  {
    path: "project",
    element: <ProjectPage />,
  },
  {
    path: "folder",
    element: <FolderPage />,
  },
  {
    path: "edit-project",
    element: <NotFound />,
  },
  {
    path: "edit-folder",
    element: <NotFound />,
  },
  {
    path: "edit-doc",
    element: <NotFound />,
  },
  {
    path: "doc",
    element: <DocPage />,
  },
  {
    path: "create-template",
    element: <CreateTemplatePage />,
  },
];

export default ROUTES;
