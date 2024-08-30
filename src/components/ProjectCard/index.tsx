import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, ListItemText, MenuItem } from "@mui/material";
import { truncateText } from "@/scripts/truncateText";
import useOpenProject from "@/hooks/useOpenProject";
import { useState } from "react";
import ContextMenu from "../ContextMenu";
import ProjectInfo from "@/types/ProjectInfo";
import useApp from "@/context/app/useApp";
import duplicateProject from "./duplicateProject";
import cardStyle from "./cardStyle";
import deleteProject from "./deleteProject";
import contentStyle from "./contentStyle";
import useProjects from "@/containers/home/useProjects";

export default function ProjectCard({
  name,
  summary,
  cover,
  path,
}: ProjectInfo) {
  const openProject = useOpenProject();
  const { userInfo } = useApp();
  const { reload } = useProjects();

  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [open, setOpen] = useState(false);

  const closeContextMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{ ...cardStyle, backgroundImage: `url(${cover})` }}
        onContextMenu={(e) => {
          const { clientX, clientY } = e;
          setPosition({ left: clientX, top: clientY });
          setOpen(true);
        }}
      >
        <CardContent sx={contentStyle}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", textOverflow: "ellipsis" }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, textOverflow: "ellipsis" }}
          >
            {truncateText(summary)}
          </Typography>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => openProject({ name, cover, summary, path })}
            >
              Open
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <ContextMenu
        {...position}
        open={open}
        closeContextMenu={closeContextMenu}
      >
        <MenuItem
          onClick={() =>
            duplicateProject(`${userInfo.workspace}/${name}`)
              .then(reload)
              .then(closeContextMenu)
          }
        >
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() =>
            deleteProject(path).then(reload).then(closeContextMenu)
          }
        >
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </ContextMenu>
    </>
  );
}
