import { Breadcrumbs, Link } from "@mui/material";
import { useProject } from "./useProject";
import { Folder, TextSnippet, Workspaces } from "@mui/icons-material";

export default function Nav() {
  const { project, selectedCollection, selectedDocument } = useProject();
  return (
    <Breadcrumbs>
      <Link
        className="breadcrumbs"
        underline="hover"
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Workspaces style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
        {project?.name}
      </Link>
      {selectedCollection.id && (
        <Link
          className="breadcrumbs"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Folder style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {selectedCollection.name}
        </Link>
      )}
      {selectedDocument.id && (
        <Link
          className="breadcrumbs"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextSnippet style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {selectedDocument.name}
        </Link>
      )}
    </Breadcrumbs>
  );
}
