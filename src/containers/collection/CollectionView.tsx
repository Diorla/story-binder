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
import { useEffectOnce } from "react-use";
import useLocalState from "@/hooks/useLocalState";
import FolderConfig from "@/types/FolderConfig";
import useRouter from "@/context/router/useRouter";
import useApp from "@/context/app/useApp";
import Nav from "./Nav";
import NewCollectionForm from "@/components/NewCollectionForm";
import CollectionList from "@/containers/collection/CollectionList";
import { cardStyle } from "./cardStyle";

export default function CollectionView() {
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState<"note" | "folder" | "">("");
  const { params } = useRouter<{ dir: string[] }>();
  const {
    userInfo: { workspace },
  } = useApp();
  const [collection, setCollection] = useLocalState<FolderConfig>(
    "collection",
    {
      name: "",
      id: "",
      note: "",
    }
  );

  const path = params.dir.join("/");
  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${workspace}/${path}/.config`,
      })
      .then((data) => setCollection(data as FolderConfig));
  });

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
      {openForm === "note" && (
        <NewDocumentForm
          currentDir={`${workspace}/${path}`}
          template={collection.template}
        />
      )}
      {openForm === "folder" && (
        <NewCollectionForm
          currentDir={`${workspace}/${path}`}
          template={collection.template}
        />
      )}
      <Grid sx={{ p: 1 }}>
        {editing ? (
          <SelectTemplate collection={collection} />
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
