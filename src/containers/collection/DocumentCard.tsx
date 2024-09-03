import {
  Box,
  Card,
  CardContent,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import ContextMenu from "@/components/ContextMenu";
import { InsertDriveFile } from "@mui/icons-material";
import EditableContent from "@/components/EditableContent";
import useRouter from "@/context/router/useRouter";
import { v4 } from "uuid";
import DocumentInfo from "@/types/DocumentInfo";
import deleteDocument from "../project/deleteDocument";
import useApp from "@/context/app/useApp";
import useOpenDir from "@/hooks/useOpenDir";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function DocumentCard({ item }: { item: DocumentInfo }) {
  const { params } = useRouter<{ dir: string[] }>();
  const navigate = useOpenDir();
  const {
    refresh,
    userInfo: { workspace },
  } = useApp();
  const dir = params.dir.join("/");
  const path = `${workspace}/${dir}`;

  const writeDocument = (data: DocumentInfo) => {
    window.api
      .sendMessage({
        type: "write-file",
        path: `${path}/${data.id}.${APP_FILE_EXT}`,
        content: { ...data },
      })
      .then(refresh);
  };

  return (
    <ContextMenu
      menuComponent={
        <>
          <Typography sx={{ p: 1 }}>{item.name}</Typography>
          <MenuItem
            onClick={() => navigate("document", [...params.dir, item.id])}
          >
            <ListItemText>Open</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => writeDocument({ ...item, id: v4() })}>
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => deleteDocument(item.id, path).then(refresh)}>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </>
      }
    >
      <Card
        key={item.id}
        sx={{ width: 240, m: 1 }}
        onDoubleClick={() => navigate("document", [...params.dir, item.id])}
      >
        <CardContent>
          <Box className="row">
            <InsertDriveFile
              onClick={() => navigate("document", [...params.dir, item.id])}
            />
            <EditableContent
              value={item.name}
              updateValue={(value) => writeDocument({ ...item, name: value })}
              textStyle={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            />
          </Box>
          <hr />
          <EditableContent
            value={item.note}
            multiline={true}
            updateValue={(value) => writeDocument({ ...item, note: value })}
            textStyle={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          />
        </CardContent>
      </Card>
    </ContextMenu>
  );
}
