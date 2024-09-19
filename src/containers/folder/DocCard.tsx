import {
  Box,
  Card,
  CardContent,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import ContextMenu from "@/components/ContextMenu";
import { InsertDriveFileOutlined } from "@mui/icons-material";
import EditableContent from "@/components/EditableContent";
import useRouter from "@/context/router/useRouter";
import { v4 } from "uuid";
import useOpenDir from "@/hooks/useOpenDir";
import useFolderContext from "./useFolderContext";
import Doc from "@/types/Doc";
import writeDoc from "@/scripts/writeDoc";
import deleteDoc from "@/scripts/deleteDoc";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function DocCard({ item }: { item: Doc }) {
  const { params } = useRouter<{ dir: string[] }>();
  const navigate = useOpenDir();
  const { currentDir, reload } = useFolderContext();
  const path = `${currentDir}/${item.id}.${APP_FILE_EXT}`;

  return (
    <ContextMenu
      menuComponent={
        <>
          <Typography sx={{ p: 1 }}>{item.name}</Typography>
          <MenuItem onClick={() => navigate("doc", [...params.dir, item.id])}>
            <ListItemText>Open</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => writeDoc({ ...item, id: v4() }, path).then(reload)}
          >
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => deleteDoc(item.id, path).then(reload)}>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </>
      }
    >
      <Card
        key={item.id}
        sx={{ width: 240, m: 1 }}
        onDoubleClick={() => navigate("doc", [...params.dir, item.id])}
      >
        <CardContent>
          <Box className="row">
            <InsertDriveFileOutlined
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("doc", [...params.dir, item.id])}
            />
            <EditableContent
              value={item.name}
              updateValue={(value) =>
                writeDoc({ ...item, name: value }, path).then(reload)
              }
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
            updateValue={(value) =>
              writeDoc({ ...item, note: value }, path).then(reload)
            }
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
