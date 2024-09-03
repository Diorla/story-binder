import { Card, Grid, IconButton } from "@mui/material";
import { Add, GridView, Tune } from "@mui/icons-material";
import { useState } from "react";
import DocumentList from "./DocumentList";
import SelectTemplate from "./SelectTemplate";
import NewCollectionForm from "./NewCollectionForm";
import { useEffectOnce } from "react-use";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import FolderConfig from "@/types/FolderConfig";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import Nav from "@/components/Nav";

export default function CollectionView() {
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [collection, setCollection] = useLocalState<FolderConfig>(
    "collection",
    {
      name: "",
      id: "",
      note: "",
    }
  );

  const { dir } = useApp();

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${dir.projectPath}/${dir.folderPath}.${APP_FILE_EXT}`,
      })
      .then((data) => setCollection(data as FolderConfig));
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
      {openForm && <NewCollectionForm collection={collection} />}
      <Grid sx={{ p: 1 }}>
        {editing ? (
          <SelectTemplate collection={collection} />
        ) : (
          <DocumentList collection={collection} />
        )}
      </Grid>
    </div>
  );
}
