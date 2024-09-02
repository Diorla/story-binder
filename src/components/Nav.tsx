import { Breadcrumbs, Link } from "@mui/material";
import { Folder, TextSnippet, Workspaces } from "@mui/icons-material";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";
import useLocalState from "@/hooks/useLocalState";
import { useEffectOnce } from "react-use";
import CollectionInfo from "@/types/CollectionInfo";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function Nav() {
  const { dir, updateDir } = useApp();
  const { navigate } = useRouter();

  const [projectInfo, setProjectInfo] = useLocalState<ProjectInfo>(
    "project-info",
    {
      name: "",
      summary: "",
      cover: "",
      path: "",
    }
  );
  const [collectionInfo, setCollectionInfo] = useLocalState<CollectionInfo>(
    "collection-info",
    {
      name: "",
      id: "",
      note: "",
    }
  );

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${dir.projectPath}/.config`,
      })
      .then((data: string) => {
        const projectInfo = JSON.parse(data) as ProjectInfo;
        setProjectInfo(projectInfo);
      });
  });

  useEffectOnce(() => {
    if (dir.collectionName)
      window.api
        .sendMessage({
          type: "read-file",
          path: `${dir.projectPath}/${dir.collectionName}.${APP_FILE_EXT}`,
        })
        .then((data: string) => {
          const collectionInfo = JSON.parse(data) as CollectionInfo;
          setCollectionInfo(collectionInfo);
        });
  });

  const openCollection = () => {
    updateDir("collectionName", dir.collectionName);
    navigate("collection");
  };

  return (
    <Breadcrumbs>
      <Link
        className="breadcrumbs"
        underline="hover"
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
        onClick={() => navigate("project", projectInfo)}
      >
        <Workspaces style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
        {projectInfo.name}
      </Link>
      {dir.collectionName && (
        <Link
          className="breadcrumbs"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
          onClick={openCollection}
        >
          <Folder style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {collectionInfo.name}
        </Link>
      )}
      {dir.documentName && (
        <Link
          className="breadcrumbs"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextSnippet style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {dir.documentName}
        </Link>
      )}
    </Breadcrumbs>
  );
}
