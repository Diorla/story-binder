import { Breadcrumbs, Link } from "@mui/material";
import { Folder, Workspaces } from "@mui/icons-material";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";
import useLocalState from "@/hooks/useLocalState";
import { useEffectOnce } from "react-use";
import FolderConfig from "@/types/FolderConfig";
import useApp from "@/context/app/useApp";
import useOpenDir from "@/hooks/useOpenDir";

export default function Nav() {
  const { _lastPath, params } = useRouter<{ dir: string[] }>();
  const navigate = useOpenDir();
  const {
    userInfo: { workspace },
  } = useApp();

  const [projectInfo, setProjectInfo] = useLocalState<ProjectInfo>(
    "project-info",
    {
      id: "",
      name: "",
      summary: "",
      cover: "",
      path: "",
    }
  );
  const [collectionList, setCollectionList] = useLocalState<FolderConfig[]>(
    "collection-list",
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
        setProjectInfo(data as ProjectInfo);
      });
  });

  useEffectOnce(() => {
    const list: FolderConfig[] = [];
    const folders = params.dir.slice(1);
    let path = root;
    folders.forEach((folder) => {
      path += `/${folder}`;
      window.api
        .sendMessage({
          type: "read-file",
          path: `${path}/.config`,
        })
        .then((data) => {
          list.push(data as FolderConfig);
        })
        .then(() => {
          setCollectionList(list);
        });
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
          {projectInfo.name}
        </Link>
        {collectionList.map((item, idx) => (
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
            <Folder style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
            {item.name}
          </Link>
        ))}
      </Breadcrumbs>
    );
  }
}
