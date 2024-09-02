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
import CollectionInfo from "@/types/CollectionInfo";
import useApp from "@/context/app/useApp";
import writeCollection from "./writeCollection";
import useRouter from "@/context/router/useRouter";
import { v4 } from "uuid";
import deleteCollection from "./deleteCollection";

export default function CollectionCard({ item }: { item: CollectionInfo }) {
  const { refresh, dir } = useApp();
  const { navigate } = useRouter();

  return (
    <ContextMenu
      menuComponent={
        <>
          <Typography sx={{ p: 1 }}>{item.name}</Typography>
          <MenuItem onClick={() => navigate("collection", item)}>
            <ListItemText>Open</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() =>
              writeCollection(
                { name: item.name, note: item.note, id: v4() },
                dir.projectPath
              ).then(refresh)
            }
          >
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() =>
              deleteCollection(item.id, dir.projectPath).then(refresh)
            }
          >
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </>
      }
    >
      <Card
        key={item.id}
        sx={{ width: 240, height: 200, m: 1 }}
        onDoubleClick={() => navigate("collection", item)}
      >
        <CardContent>
          <Box className="row">
            <Folder onClick={() => navigate("collection", item)} />
            <EditableContent
              value={item.name}
              updateValue={(value) =>
                writeCollection({ ...item, name: value }, dir.projectPath).then(
                  refresh
                )
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
              writeCollection({ ...item, note: value }, dir.projectPath).then(
                refresh
              )
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
