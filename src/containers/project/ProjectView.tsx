import { Card, Box, IconButton } from "@mui/material";
import { CreateNewFolderOutlined, GridView, Tune } from "@mui/icons-material";
import { useState } from "react";
import EditProject from "./EditProject";
import Nav from "./Nav";
import NewFolderForm from "@/components/NewFolderForm";
import useProjectContext from "./useProjectContext";
import FolderList from "./FolderList";

export default function ProjectView() {
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { path } = useProjectContext();

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
      {openForm && <NewFolderForm currentDir={path} />}
      <Box sx={{ p: 1 }}>{editing ? <EditProject /> : <FolderList />}</Box>
    </div>
  );
}
