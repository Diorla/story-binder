import { Card, Divider, Grid, IconButton } from "@mui/material";
import {
  CreateNewFolderOutlined,
  GridView,
  NoteAddOutlined,
  Tune,
} from "@mui/icons-material";
import { useState } from "react";
import DocumentList from "./DocumentList";
import SelectTemplate from "./SelectTemplate";
import NewDocumentForm from "./NewDocumentForm";
import Nav from "./Nav";
import NewCollectionForm from "@/components/NewCollectionForm";
import CollectionList from "@/containers/collection/CollectionList";
import { cardStyle } from "./cardStyle";
import useCollectionContext from "./useCollectionContext";

export default function CollectionView() {
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState<"note" | "folder" | "">("");
  const { collection, currentDir } = useCollectionContext();

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
          <IconButton onClick={() => setOpenForm(openForm ? "" : "folder")}>
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
      {openForm === "note" && <NewDocumentForm />}
      {openForm === "folder" && (
        <NewCollectionForm
          currentDir={currentDir}
          template={collection.template}
        />
      )}
      <Grid sx={{ p: 1 }}>
        {editing ? (
          <SelectTemplate />
        ) : (
          <>
            <CollectionList />
            <Divider />
            <DocumentList />
          </>
        )}
      </Grid>
    </div>
  );
}
