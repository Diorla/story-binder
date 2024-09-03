import { Card, Grid, IconButton } from "@mui/material";
import { Add, GridView, Tune } from "@mui/icons-material";
import { useState } from "react";
import CollectionList from "./CollectionList";
import EditProject from "./EditProject";
import NewCollectionForm from "./NewCollectionForm";
import { useEffectOnce } from "react-use";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import ProjectInfo from "@/types/ProjectInfo";
import Nav from "@/components/Nav";

export default function ProjectView() {
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [project, setProject] = useLocalState<ProjectInfo>("project", {
    name: "",
    summary: "",
    cover: "",
    path: "",
  });

  const { dir } = useApp();

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${dir.projectPath}/.config`,
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
            <Add style={{ fontSize: 21, cursor: "pointer" }} />
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
      {openForm && <NewCollectionForm />}
      <Grid sx={{ p: 1 }}>
        {editing ? <EditProject defaultValue={project} /> : <CollectionList />}
      </Grid>
    </div>
  );
}
