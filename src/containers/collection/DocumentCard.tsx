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

export default function DocumentCard({
  item,
  writeDocument,
  deleteDocument,
}: {
  item: DocumentInfo;
  writeDocument: (data: DocumentInfo) => void;
  deleteDocument: (id: string) => void;
}) {
  const { navigate } = useRouter();

  return (
    <ContextMenu
      menuComponent={
        <>
          <Typography sx={{ p: 1 }}>{item.name}</Typography>
          <MenuItem onClick={() => navigate("document", item)}>
            <ListItemText>Open</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() =>
              writeDocument({ name: item.name, note: item.note, id: v4() })
            }
          >
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => deleteDocument(item.id)}>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </>
      }
    >
      <Card
        key={item.id}
        sx={{ width: 240, height: 200, m: 1 }}
        onDoubleClick={() => navigate("document", item)}
      >
        <CardContent>
          <Box className="row">
            <InsertDriveFile onClick={() => navigate("document", item)} />
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
