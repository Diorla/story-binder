import { Card, Grid, IconButton } from "@mui/material";
import { CreateNewFolderOutlined, GridView, Tune } from "@mui/icons-material";
import { useState } from "react";
import CollectionList from "./CollectionList";
import EditProject from "./EditProject";
import NewCollectionForm from "../../components/NewCollectionForm";
import { useEffectOnce } from "react-use";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import ProjectInfo from "@/types/ProjectInfo";
import Nav from "./Nav";
import useRouter from "@/context/router/useRouter";

export default function ProjectView() {
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [project, setProject] = useLocalState<ProjectInfo>("project", {
    id: "",
    name: "",
    summary: "",
    cover: "",
    path: "",
  });
  const { params } = useRouter<{ dir: string[] }>();

  const {
    userInfo: { workspace },
  } = useApp();
  const path = `${workspace}/${params.dir.join("/")}`;

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${path}/.config`,
      })
      .then((data) => setProject(data as ProjectInfo));
  });

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          p: 1,
          borderRadius: 0,
        }}
      >
        <Nav />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <IconButton onClick={() => setOpenForm(!openForm)}>
            <CreateNewFolderOutlined
              style={{ fontSize: 21, cursor: "pointer" }}
            />
          </IconButton>
          <IconButton onClick={() => setEditing(!editing)}>
            {editing ? (
              <GridView style={{ fontSize: 21, cursor: "pointer" }} />
            ) : (
              <Tune style={{ fontSize: 21, cursor: "pointer" }} />
            )}
          </IconButton>
        </div>
      </Card>
      {openForm && <NewCollectionForm currentDir={path} />}
      <Grid sx={{ p: 1 }}>
        {editing ? <EditProject defaultValue={project} /> : <CollectionList />}
      </Grid>
    </div>
  );
}
