import Path from "@/types/Path";
import Home from "@/pages/home";
import { ReactElement } from "react";
import CreateProject from "@/pages/create-project";
import Project from "@/pages/project";

const ROUTES: { path: Path; element: ReactElement }[] = [
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "create-project",
    element: <CreateProject />,
  },
  {
    path: "project",
    element: <Project />,
  },
];

export default ROUTES;
