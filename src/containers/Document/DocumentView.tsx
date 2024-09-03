import { Card, Grid, IconButton } from "@mui/material";
import { Mode, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import FolderConfig from "@/types/FolderConfig";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import Nav from "@/components/Nav";
import Edit from "./Edit";
import Preview from "./Preview";

export default function DocumentView() {
  const [editing, setEditing] = useState(false);
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

  const documents = collection.document || {};
  const document = documents[dir.documentId];

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
          <IconButton onClick={() => setEditing(!editing)}>
            {editing ? (
              <Mode style={{ fontSize: 21, cursor: "pointer" }} />
            ) : (
              <Visibility style={{ fontSize: 21, cursor: "pointer" }} />
            )}
          </IconButton>
        </div>
      </Card>
      <Grid sx={{ p: 1 }}>
        {editing ? (
          <Preview document={document} />
        ) : (
          <Edit collection={collection} />
        )}
      </Grid>
    </div>
  );
}
