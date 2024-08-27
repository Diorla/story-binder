import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import DrawerItem from "./DrawerItem";
import { useProject } from "@/context/project/useProject";
import ProjectButton from "./ProjectButton";
import SidebarControl from "./SidebarControl";
import CollectionInput from "./CollectionInput";
import useLocalState from "@/hooks/useLocalState";

export default function Sidebar({
  expanded,
  toggleDrawer,
}: {
  expanded: boolean;
  toggleDrawer: () => void;
}) {
  const { collection, toggleExpanded, selected, setSelected } = useProject();
  const [openForm, setOpenForm] = useLocalState("open-collection-form", false);

  const drawerWidth = expanded ? 180 : 40;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: "width 0.3s ease-in-out",
        },
      }}
    >
      <Toolbar variant="dense" />
      <ProjectButton />
      <SidebarControl
        expanded={expanded}
        openForm={() => setOpenForm(true)}
        toggleDrawer={toggleDrawer}
      />
      <Box sx={{ overflow: "auto" }}>
        <CollectionInput
          visible={openForm}
          closeForm={() => {
            setOpenForm(false);
          }}
        />
        {expanded ? (
          <List>
            {collection.map((name) => (
              <DrawerItem
                key={name}
                text={name}
                onClick={() => {
                  toggleExpanded(name);
                  setSelected({
                    type: "collection",
                    name,
                  });
                }}
                active={
                  selected?.type === "collection" && selected.name === name
                }
              />
            ))}
          </List>
        ) : null}
      </Box>
    </Drawer>
  );
}
