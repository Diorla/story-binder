import { Box, Card, CardContent } from "@mui/material";
import { useProject } from "./useProject";
import EditableContent from "./EditableContent";

const CollectionCard = ({
  item,
}: {
  item: {
    name: string;
    note: string;
    id: string;
  };
}) => {
  const { createCollection } = useProject();
  return (
    <Card key={item.id} sx={{ width: 200, height: 200, m: 1 }}>
      <CardContent>
        <EditableContent
          value={item.name}
          updateValue={(value) => createCollection({ ...item, name: value })}
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
          updateValue={(value) => createCollection({ ...item, note: value })}
          textStyle={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        />
      </CardContent>
    </Card>
  );
};
export default function CollectionList() {
  const { collection } = useProject();
  return (
    <Box sx={{ display: "flex" }}>
      {collection.map((item) => (
        <CollectionCard item={item} />
      ))}
    </Box>
  );
}
