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
import DocumentInfo from "@/types/DocumentInfo";
import deleteDocument from "../project/deleteDocument";
import useOpenDir from "@/hooks/useOpenDir";
import useCollectionContext from "./useCollectionContext";
import writeDocument from "./writeDocument";

export default function DocumentCard({ item }: { item: DocumentInfo }) {
  const { params } = useRouter<{ dir: string[] }>();
  const navigate = useOpenDir();
  const { currentDir, reload } = useCollectionContext();

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
          <MenuItem
            onClick={() =>
              writeDocument({ ...item, id: v4() }, currentDir).then(reload)
            }
          >
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => deleteDocument(item.id, currentDir).then(reload)}
          >
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
            <InsertDriveFileOutlined
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("document", [...params.dir, item.id])}
            />
            <EditableContent
              value={item.name}
              updateValue={(value) =>
                writeDocument({ ...item, name: value }, currentDir).then(reload)
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
              writeDocument({ ...item, note: value }, currentDir).then(reload)
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
