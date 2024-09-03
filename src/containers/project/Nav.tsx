import { Breadcrumbs, Link } from "@mui/material";
import { Workspaces } from "@mui/icons-material";
import useProjectContext from "./useProjectContext";

export default function Nav() {
  const { project } = useProjectContext();

  return (
    <Breadcrumbs>
      <Link
        className="breadcrumbs"
        underline="hover"
        color="primary"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Workspaces style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
        {project.name}
      </Link>
    </Breadcrumbs>
  );
}
