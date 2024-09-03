import { Breadcrumbs, Link } from "@mui/material";
import { Workspaces } from "@mui/icons-material";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";
import useLocalState from "@/hooks/useLocalState";
import { useEffectOnce } from "react-use";

export default function Nav() {
  const {
    userInfo: { workspace },
  } = useApp();
  const { params } = useRouter<{ dir: string[] }>();

  const [projectInfo, setProjectInfo] = useLocalState<ProjectInfo>(
    "project-info",
    {
      name: "",
      summary: "",
      cover: "",
      path: "",
    }
  );

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${workspace}/${params.dir[0]}/.config`,
      })
      .then((data) => {
        setProjectInfo(data as ProjectInfo);
      });
  });

  return (
    <Breadcrumbs>
      <Link
        className="breadcrumbs"
        underline="hover"
        color="primary"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Workspaces style={{ fontSize: 18 }} sx={{ mr: 0.5 }} />
        {projectInfo.name}
      </Link>
    </Breadcrumbs>
  );
}
