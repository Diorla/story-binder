import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, ListItemText, MenuItem } from "@mui/material";
import ContextMenu from "@/components/ContextMenu";
import Project from "@/types/Project";
import cardStyle from "./cardStyle";
import deleteProject from "./deleteProject";
import contentStyle from "./contentStyle";
import useApp from "@/context/app/useApp";
import { useEffect, useRef } from "react";
import clamp from "clamp-js";
import useOpenDir from "@/hooks/useOpenDir";
import duplicateProject from "./duplicateProject";
import useHomeContext from "../useHomeContext";

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useOpenDir();
  const {
    userInfo: { projectPath },
  } = useApp();
  const summaryRef = useRef<any>();
  const headerRef = useRef<any>();
  const { reloadProjects } = useHomeContext();

  useEffect(() => {
    clamp(summaryRef?.current, { clamp: 6 });
    clamp(headerRef?.current, { clamp: 2 });
  }, []);

  return (
    <>
      <ContextMenu
        menuComponent={
          <>
            <Typography sx={{ p: 1 }}>{project.name}</Typography>
            <MenuItem
              onClick={() =>
                duplicateProject({ ...project }, projectPath).then(
                  reloadProjects
                )
              }
            >
              <ListItemText>Duplicate</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => deleteProject(project.path).then(reloadProjects)}
            >
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </>
        }
      >
        <Card sx={{ ...cardStyle, backgroundImage: `url(${project.cover})` }}>
          <CardContent sx={contentStyle}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                textAlign: "center",
              }}
              ref={headerRef}
            >
              {project.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500 }}
              ref={summaryRef}
            >
              {project.summary}
            </Typography>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => navigate("project", [project.id])}
              >
                Open
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </ContextMenu>
    </>
  );
}
