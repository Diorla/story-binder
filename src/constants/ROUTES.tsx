import Path from "@/types/Path";
import Home from "@/pages/home";
import { ReactElement } from "react";
import About from "@/pages/about";

const ROUTES: { path: Path; element: ReactElement }[] = [
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
];

export default ROUTES;
