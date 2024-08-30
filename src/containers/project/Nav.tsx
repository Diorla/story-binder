import { Breadcrumbs, Link } from "@mui/material";
import { useProject } from "./project-view/useProject";
import { Folder, TextSnippet, Workspaces } from "@mui/icons-material";

export default function Nav() {
  const { project, selectedCollection, selectedDocument, selectItem } =
    useProject();
  return (
    <Breadcrumbs>
      <Link
        className="breadcrumbs"
        underline="hover"
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
        onClick={() =>
          selectItem({
            type: "project",
            id: "",
            name: "",
          })
        }
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
          onClick={() =>
            selectItem({
              type: "collection",
              id: selectedCollection.id,
              name: selectedCollection.name,
            })
          }
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
