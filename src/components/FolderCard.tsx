import {
  Box,
  Card,
  CardContent,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import ContextMenu from "@/components/ContextMenu";
import { FolderOutlined } from "@mui/icons-material";
import EditableContent from "@/components/EditableContent";
import Folder from "@/types/Folder";
import useApp from "@/context/app/useApp";
import writeFolder from "../scripts/writeFolder";
import useRouter from "@/context/router/useRouter";
import { v4 } from "uuid";
import deleteFolder from "../containers/project/deleteFolder";
import useOpenDir from "@/hooks/useOpenDir";

export default function FolderCard({ item }: { item: Folder }) {
  const {
    refresh,
    userInfo: { workspace },
  } = useApp();
  const { params } = useRouter<{ dir: string[] }>();
  const navigate = useOpenDir();

  const path = `${workspace}/${params.dir.join("/")}`;
  return (
    <ContextMenu
      menuComponent={
        <>
          <Typography sx={{ p: 1 }}>{item.name}</Typography>
          <MenuItem
            onClick={() => navigate("folder", [...params.dir, item.id])}
          >
            <ListItemText>Open</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() =>
              writeFolder(
                {
                  name: item.name,
                  note: item.note,
                  id: v4(),
                  template: item.template,
                },
                path
              ).then(refresh)
            }
          >
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => deleteFolder(item.id, path).then(refresh)}>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </>
      }
    >
      <Card
        key={item.id}
        sx={{ width: 240, m: 1 }}
        onDoubleClick={() => navigate("folder", [...params.dir, item.id])}
      >
        <CardContent>
          <Box className="row">
            <FolderOutlined
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("folder", [...params.dir, item.id])}
            />
            <EditableContent
              value={item.name}
              updateValue={(value) =>
                writeFolder({ ...item, name: value }, path).then(refresh)
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
              writeFolder({ ...item, note: value }, path).then(refresh)
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
