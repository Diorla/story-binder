import { Box, Card, CardContent } from "@mui/material";
import { useProject } from "./useProject";
import EditableContent from "./EditableContent";

export default function CollectionList() {
  const { collection, createCollection } = useProject();
  return (
    <Box sx={{ display: "flex" }}>
      {collection.map((item) => (
        <Card key={item.id} sx={{ width: 200, height: 200, m: 1 }}>
          <CardContent>
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
            <hr />
            <EditableContent
              value={item.note}
              multiline={true}
              updateValue={(value) =>
                createCollection({ ...item, note: value })
              }
              textStyle={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
