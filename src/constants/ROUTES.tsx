import Path from "@/types/Path";
import { ReactElement } from "react";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import CreateProjectPage from "@/pages/create-project";
import ProjectPage from "@/pages/project";
import CollectionPage from "@/pages/collection";
import Templates from "@/pages/templates";
import CreateTemplatePage from "@/pages/create-template";

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
    path: "collection",
    element: <CollectionPage />,
  },
  {
    path: "edit-project",
    element: <NotFound />,
  },
  {
    path: "edit-collection",
    element: <NotFound />,
  },
  {
    path: "edit-document",
    element: <NotFound />,
  },
  {
    path: "document",
    element: <NotFound />,
  },
  {
    path: "create-template",
    element: <CreateTemplatePage />,
  },
];

export default ROUTES;
