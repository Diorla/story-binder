import { createRoot } from "react-dom/client";
import Temp from "./containers/Temp";

const root = createRoot(document.getElementById("app"));
root.render(
  <div>
    <h2>Hello from React!</h2>
    <Temp />
  </div>
);
