import { HighlightOff } from "@mui/icons-material";
import {
  ListItem,
  Tooltip,
  IconButton,
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
  isTemplate,
}: DrawerItemProps) {
  const { palette } = useTheme();
  const { selectedDocId, setSelectedDocId, project } = useProject();

  const isDir = !isTemplate && !isFile;

  const collection: { [key: string]: { name: string } } =
    project?.collection[text] || {};
  const list = Object.keys(collection).filter((item) => item !== "template");

  return (
    <>
      <ListItem
        onClick={onClick}
        key={text}
        disablePadding
        sx={{
          padding: 0,
          backgroundColor: active ? palette.grey[200] : "transparent",
          [`& .MuiListItemButton-root`]: {
            padding: 0,
          },
          [`& .MuiListItemSecondaryAction-root`]: {
            display: "none",
          },
          [`&:hover .MuiListItemSecondaryAction-root`]: {
            display: "initial",
            backgroundColor: palette.grey[200],
            opacity: 0.8,
          },
          [`& .MuiListItemSecondaryAction-root:hover`]: {
            display: "initial",
            backgroundColor: palette.grey[50],
            opacity: 1,
          },
        }}
        secondaryAction={
          isTemplate ? null : (
            <Tooltip title="Delete">
              {/* eslint-disable-next-line no-console */}
              <IconButton onClick={() => console.log("delete")} size="small">
                <HighlightOff />
              </IconButton>
            </Tooltip>
          )
        }
      >
        <LeftIcon active={active} isTemplate={isTemplate} isFile={isFile} />
        <ListItemButton>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
      {active && isDir ? (
        <div style={{ marginLeft: 10 }}>
          <DrawerItem
            isTemplate={true}
            active={selectedDocId === "template" + text}
            text="Template"
            onClick={() => setSelectedDocId("template" + text)}
          />
          {list?.length
            ? list.map((item, index) => (
                <DrawerItem
                  isFile={true}
                  text={collection[item]?.name || item}
                  key={index}
                  active={selectedDocId === item}
                  onClick={() => setSelectedDocId(item)}
                />
              ))
            : null}
        </div>
      ) : null}
    </>
  );
}
