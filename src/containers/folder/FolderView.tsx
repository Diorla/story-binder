import { Card, Divider, Grid, IconButton } from "@mui/material";
import {
  CreateNewFolderOutlined,
  GridView,
  NoteAddOutlined,
  Tune,
} from "@mui/icons-material";
import { useState } from "react";
import DocList from "./DocList";
import SelectTemplate from "./SelectTemplate";
import NewDocForm from "./NewDocForm";
import Nav from "./Nav";
import FolderList from "@/containers/folder/FolderList";
import { cardStyle } from "./cardStyle";
import useFolderContext from "./useFolderContext";
import TooltipWrapper from "@/components/TooltipWrapper";
import NewFolderForm from "@/components/NewFolderForm";

export default function FolderView() {
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState<"note" | "folder" | "">("");
  const { folder, currentDir } = useFolderContext();

  return (
    <div>
      <Card sx={cardStyle}>
        <Nav />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <IconButton onClick={() => setOpenForm(openForm ? "" : "note")}>
            <NoteAddOutlined style={{ fontSize: 21, cursor: "pointer" }} />
          </IconButton>
          <TooltipWrapper tooltip="New folder" side="bottom">
            <IconButton onClick={() => setOpenForm(openForm ? "" : "folder")}>
              <CreateNewFolderOutlined
                style={{ fontSize: 21, cursor: "pointer" }}
              />
            </IconButton>
          </TooltipWrapper>
          <IconButton onClick={() => setEditing(!editing)}>
            {editing ? (
              <GridView style={{ fontSize: 21, cursor: "pointer" }} />
            ) : (
              <Tune style={{ fontSize: 21, cursor: "pointer" }} />
            )}
          </IconButton>
        </div>
      </Card>
      {openForm === "note" && <NewDocForm />}
      {openForm === "folder" && (
        <NewFolderForm currentDir={currentDir} template={folder.template} />
      )}
      <Grid sx={{ p: 1 }}>
        {editing ? (
          <SelectTemplate />
        ) : (
          <>
            <FolderList />
            <Divider />
            <DocList />
          </>
        )}
      </Grid>
    </div>
  );
}
