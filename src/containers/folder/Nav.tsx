import { Breadcrumbs, Link } from "@mui/material";
import { Folder as FolderIcon, Workspaces } from "@mui/icons-material";
import useRouter from "@/context/router/useRouter";
import useLocalState from "@/hooks/useLocalState";
import { useEffectOnce } from "react-use";
import Folder from "@/types/Folder";
import useApp from "@/context/app/useApp";
import useOpenDir from "@/hooks/useOpenDir";
import { truncateText } from "@/scripts/truncateText";
import Project from "@/types/Project";
import validateProject from "@/schema/validateProject";
import readFolderList from "@/scripts/readFolderList";

export default function Nav() {
  const { _lastPath, params } = useRouter<{ dir: string[] }>();
  const navigate = useOpenDir();
  const {
    userInfo: { workspace },
  } = useApp();

  const [projectInfo, setProjectInfo] = useLocalState<Project>("project-info", {
    id: "",
    name: "",
    summary: "",
    cover: "",
    path: "",
  });
  const [folderPaths, setFolderPaths] = useLocalState<Folder[]>(
    "folder-paths",
    []
  );

  const projectName = params.dir[0];
  const root = `${workspace}/${projectName}`;
  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${root}/.config`,
      })
      .then((data) => {
        setProjectInfo(validateProject(data as Project));
      });
  });

  useEffectOnce(() => {
    const folders = params.dir.slice(1);
    let path = root;
    folders.forEach((folder) => {
      path += `/${folder}`;
      readFolderList(path).then((data) => setFolderPaths(data));
    });
  });

  if (projectInfo) {
    const folderList = params.dir.slice(1);
    return (
      <Breadcrumbs maxItems={3}>
        <Link
          className="breadcrumbs"
          underline="hover"
          color={_lastPath === "project" ? "primary" : "inherit"}
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate("project", [projectInfo.id])}
        >
          <Workspaces style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {truncateText(projectInfo.name, 15)}
        </Link>
        {folderPaths.map((item, idx) => (
          <Link
            key={item.id}
            className="breadcrumbs"
            underline="hover"
            color={folderList.length === idx + 1 ? "primary" : "inherit"}
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() =>
              navigate("folder", [
                projectInfo.id,
                ...folderList.slice(0, idx + 1),
              ])
            }
          >
            <FolderIcon style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
            {truncateText(item.name, 15)}
          </Link>
        ))}
      </Breadcrumbs>
    );
  }
}
