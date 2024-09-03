import { Breadcrumbs, Link } from "@mui/material";
import { Folder, TextSnippet, Workspaces } from "@mui/icons-material";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";
import useLocalState from "@/hooks/useLocalState";
import { useEffectOnce } from "react-use";
import FolderConfig from "@/types/FolderConfig";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function Nav() {
  const { dir, updateDir } = useApp();
  const { navigate, _lastPath } = useRouter();

  const [projectInfo, setProjectInfo] = useLocalState<ProjectInfo>(
    "project-info",
    {
      name: "",
      summary: "",
      cover: "",
      path: "",
    }
  );
  const [collectionInfo, setCollectionInfo] = useLocalState<FolderConfig>(
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
          const collectionInfo = JSON.parse(data) as FolderConfig;
          setCollectionInfo(collectionInfo);
        });
  });

  const openCollection = () => {
    updateDir("collectionName", dir.collectionName);
    navigate("collection", { id: dir.collectionName });
  };

  const documents = collectionInfo.document || {};
  const document = documents[dir.documentId];
  return (
    <Breadcrumbs>
      <Link
        className="breadcrumbs"
        underline="hover"
        color={_lastPath === "project" ? "primary" : "inherit"}
        sx={{ display: "flex", alignItems: "center" }}
        onClick={() => navigate("project", projectInfo)}
      >
        <Workspaces style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
        {projectInfo.name}
      </Link>
      {collectionInfo.name && (
        <Link
          className="breadcrumbs"
          underline="hover"
          color={_lastPath === "collection" ? "primary" : "inherit"}
          sx={{ display: "flex", alignItems: "center" }}
          onClick={openCollection}
        >
          <Folder style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {collectionInfo.name}
        </Link>
      )}
      {document?.name && collectionInfo.name && (
        <Link
          className="breadcrumbs"
          underline="hover"
          color={_lastPath === "document" ? "primary" : "inherit"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextSnippet style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {document?.name}
        </Link>
      )}
    </Breadcrumbs>
  );
}
