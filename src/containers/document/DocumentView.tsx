import { Card, Grid, IconButton } from "@mui/material";
import { Mode, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import Edit from "./Edit";
import Preview from "./Preview";
import DocumentInfo from "@/types/DocumentInfo";
import useRouter from "@/context/router/useRouter";
import useApp from "@/context/app/useApp";
import Nav from "./Nav";

export default function DocumentView() {
  const [editing, setEditing] = useState(false);
  const [document, setDocument] = useState<DocumentInfo>({
    name: "",
    id: "",
    note: "",
  });
  const { params } = useRouter<{ dir: string[] }>();
  const {
    userInfo: { workspace },
  } = useApp();
  const path = `${workspace}/${params.dir.join("/")}.${APP_FILE_EXT}`;

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path,
      })
      .then((data) => setDocument(data as DocumentInfo));
  });

  if (!document) return null;

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
      <Grid sx={{ p: 1 }}>{editing ? <Preview /> : <Edit />}</Grid>
    </div>
  );
}
