import {
  Box,
  Card,
  CardContent,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import ContextMenu from "@/components/ContextMenu";
import { Folder } from "@mui/icons-material";
import EditableContent from "@/components/EditableContent";
import FolderConfig from "@/types/FolderConfig";
import useApp from "@/context/app/useApp";
import writeCollection from "../scripts/writeCollection";
import useRouter from "@/context/router/useRouter";
import { v4 } from "uuid";
import deleteCollection from "../containers/project/deleteCollection";
import useOpenDir from "@/hooks/useOpenDir";

export default function CollectionCard({ item }: { item: FolderConfig }) {
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
            onClick={() => navigate("folder", [...params.dir, item.name])}
          >
            <ListItemText>Open</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() =>
              writeCollection(
                { name: item.name, note: item.note, id: v4() },
                path
              ).then(refresh)
            }
          >
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => deleteCollection(item.id, path).then(refresh)}
          >
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </>
      }
    >
      <Card
        key={item.id}
        sx={{ width: 240, height: 200, m: 1 }}
        onDoubleClick={() => navigate("folder", [...params.dir, item.name])}
      >
        <CardContent>
          <Box className="row">
            <Folder
              onClick={() => navigate("folder", [...params.dir, item.name])}
            />
            <EditableContent
              value={item.name}
              updateValue={(value) =>
                writeCollection({ ...item, name: value }, path).then(refresh)
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
              writeCollection({ ...item, note: value }, path).then(refresh)
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
