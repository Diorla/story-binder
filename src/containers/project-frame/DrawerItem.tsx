import {
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import LeftIcon from "./LeftIcon";
import DrawerItemProps from "./DrawerItemProps";
import { useProject } from "@/context/project/useProject";

export default function DrawerItem({
  text,
  onClick,
  active,
  isFile,
}: DrawerItemProps) {
  const { palette } = useTheme();
  const { expandedCollection, setSelected, selected } = useProject();

  const list: string[] = expandedCollection[text] || [];

  const isExpanded = !!expandedCollection[text];

  let backgroundColor = "transparent";
  if (isExpanded) {
    backgroundColor = palette.grey[200];
  }
  if (active) {
    backgroundColor = palette.secondary.main;
  }

  return (
    <>
      <ListItem
        onClick={onClick}
        key={text}
        disablePadding
        sx={{
          padding: 0,
          backgroundColor,
          [`& .MuiListItemButton-root`]: {
            padding: 0,
          },
        }}
      >
        <LeftIcon active={isExpanded} isFile={isFile} />
        <ListItemButton>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
      {isExpanded ? (
        <div style={{ marginLeft: 10 }}>
          {list.map((name, index) => (
            <DrawerItem
              isFile={true}
              text={name}
              key={index}
              active={selected.type === "document" && selected.name === name}
              onClick={() => {
                setSelected({
                  type: "document",
                  name,
                });
              }}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
