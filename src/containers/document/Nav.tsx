/* eslint-disable max-lines */
import { Breadcrumbs, Link } from "@mui/material";
import { Folder, TextSnippet, Workspaces } from "@mui/icons-material";
import useRouter from "@/context/router/useRouter";
import Project from "@/types/ProjectInfo";
import useLocalState from "@/hooks/useLocalState";
import { useEffectOnce } from "react-use";
import Folder from "@/types/Folder";
import useApp from "@/context/app/useApp";
import useOpenDir from "@/hooks/useOpenDir";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import DocumentInfo from "@/types/DocumentInfo";

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
  const [collectionList, setCollectionList] = useLocalState<Folder[]>(
    "collection-list",
    []
  );

  const [document, setDocument] = useLocalState<DocumentInfo>("document", {
    id: "",
    note: "",
    name: "",
  });
  const projectName = params.dir[0];
  const root = `${workspace}/${projectName}`;
  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${root}/.config`,
      })
      .then((data) => {
        setProjectInfo(data as Project);
      });
  });

  useEffectOnce(() => {
    const list: Folder[] = [];
    const folders = params.dir.slice(1, params.dir.length - 1);
    let path = root;
    folders.forEach((folder) => {
      path += `/${folder}`;
      window.api
        .sendMessage({
          type: "read-file",
          path: `${path}/.config`,
        })
        .then((data) => {
          list.push(data as Folder);
        })
        .then(() => {
          setCollectionList(list);
        });
    });
  });

  useEffectOnce(() => {
    const documentId = params.dir.join("/");
    const path = `${workspace}/${documentId}.${APP_FILE_EXT}`;

    window.api
      .sendMessage({
        type: "read-file",
        path,
      })
      .then((data) => {
        setDocument(data as DocumentInfo);
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
            color="inherit"
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
        <Link
          className="breadcrumbs"
          underline="hover"
          color="primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextSnippet style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
          {document?.name}
        </Link>
      </Breadcrumbs>
    );
  }
}
