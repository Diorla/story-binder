import { Card, CardContent } from "@mui/material";
import { useProject } from "./useProject";
import EditableContent from "./EditableContent";

const obj = {
  id: "1",
  name: "Collection 1 Collection 1 Collection 1 Collection 1 Collection 1 ",
  description: "This is collection 1".repeat(10),
  createdAt: new Date(),
  updatedAt: new Date(),
};
const collection: {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}[] = [];

for (let i = 0; i < 20; i++) {
  collection.push({ ...obj, id: String(i) });
}

export default function MainWindow() {
  const { selectedDocument, selectedCollection } = useProject();
  if (selectedDocument) return <div>Document</div>;
  if (selectedCollection) return <div>Collection</div>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {collection.map((item) => (
        <Card key={item.id} sx={{ width: 200, height: 200, m: 1 }}>
          <CardContent>
            <EditableContent
              value={item.name}
              updateValue={(value) => console.log("value", value)}
              textStyle={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            />
            <EditableContent
              value={item.description}
              multiline={true}
              updateValue={(value) => console.log("value", value)}
              textStyle={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
