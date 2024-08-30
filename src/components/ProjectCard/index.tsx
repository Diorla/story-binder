import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, ListItemText, MenuItem } from "@mui/material";
import ContextMenu from "../ContextMenu";
import ProjectInfo from "@/types/ProjectInfo";
import useApp from "@/context/app/useApp";
import duplicateProject from "./duplicateProject";
import cardStyle from "./cardStyle";
import deleteProject from "./deleteProject";
import contentStyle from "./contentStyle";
import useProjects from "@/containers/home/useProjects";
import useRouter from "@/context/router/useRouter";

export default function ProjectCard(project: ProjectInfo) {
  const { navigate } = useRouter<ProjectInfo>();
  const { userInfo } = useApp();
  const { reload } = useProjects();

  return (
    <>
      <ContextMenu
        menuComponent={
          <>
            <MenuItem
              onClick={() =>
                duplicateProject(`${userInfo.workspace}/${name}`).then(reload)
              }
            >
              <ListItemText>Duplicate</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => deleteProject(project.path).then(reload)}>
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
              sx={{ textAlign: "center", textOverflow: "ellipsis" }}
            >
              {project.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, textOverflow: "ellipsis" }}
            >
              {project.summary}
            </Typography>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => navigate("project", project)}
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
