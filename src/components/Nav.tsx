import { Breadcrumbs, Link } from "@mui/material";
import { Folder, TextSnippet, Workspaces } from "@mui/icons-material";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";

export default function Nav({ projectName }: { projectName: string }) {
  const { dir, updateDir } = useApp();
  const { navigate } = useRouter<ProjectInfo>();

  const openProject = () => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${dir.projectPath}/.config`,
      })
      .then((data: string) => {
        const projectInfo = JSON.parse(data) as ProjectInfo;
        navigate("project", projectInfo);
      });
  };

  const openFolder = () => {
    updateDir("folderName", dir.folderName);
    navigate("folder");
  };

  return (
    <Breadcrumbs>
      <Link
        className="breadcrumbs"
        underline="hover"
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
        onClick={openProject}
      >
        <Workspaces style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
        {projectName}
      </Link>
      {dir.folderName && (
        <Link
          className="breadcrumbs"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
          onClick={openFolder}
        >
          <Folder style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {dir.folderName}
        </Link>
      )}
      {dir.fileName && (
        <Link
          className="breadcrumbs"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextSnippet style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {dir.fileName}
        </Link>
      )}
    </Breadcrumbs>
  );
}
