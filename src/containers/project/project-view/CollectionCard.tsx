import {
  Box,
  Card,
  CardContent,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { useProject } from "./useProject";
import ContextMenu from "@/components/ContextMenu";
import { Folder } from "@mui/icons-material";
import EditableContent from "@/components/EditableContent";
import CollectionInfo from "@/types/CollectionInfo";

export default function CollectionCard({ item }: { item: CollectionInfo }) {
  const { createCollection, deleteCollection, selectItem } = useProject();

  return (
    <ContextMenu
      menuComponent={
        <>
          <Typography sx={{ p: 1 }}>{item.name}</Typography>
          <MenuItem
            onClick={() =>
              selectItem({
                type: "collection",
                id: item.id,
                name: item.name,
              })
            }
          >
            <ListItemText>Open</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() =>
              createCollection({ name: item.name, note: item.note })
            }
          >
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => deleteCollection(item.id)}>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </>
      }
    >
      <Card
        key={item.id}
        sx={{ width: 240, height: 200, m: 1 }}
        onDoubleClick={() =>
          selectItem({
            type: "collection",
            id: item.id,
            name: item.name,
          })
        }
      >
        <CardContent>
          <Box className="row">
            <Folder
              onClick={() =>
                selectItem({
                  type: "collection",
                  id: item.id,
                  name: item.name,
                })
              }
            />
            <EditableContent
              value={item.name}
              updateValue={(value) =>
                createCollection({ ...item, name: value })
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
            updateValue={(value) => createCollection({ ...item, note: value })}
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
