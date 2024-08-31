import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, ListItemText, MenuItem } from "@mui/material";
import ContextMenu from "@/components/ContextMenu";
import ProjectInfo from "@/types/ProjectInfo";
import duplicateProject from "./duplicateProject";
import cardStyle from "./cardStyle";
import deleteProject from "./deleteProject";
import contentStyle from "./contentStyle";
import useRouter from "@/context/router/useRouter";
import useApp from "@/context/app/useApp";

export default function ProjectCard({ project }: { project: ProjectInfo }) {
  const { navigate } = useRouter<ProjectInfo>();
  const { refresh } = useApp();

  return (
    <>
      <ContextMenu
        menuComponent={
          <>
            <Typography sx={{ p: 1 }}>{project.name}</Typography>
            <MenuItem
              onClick={() => duplicateProject(`${project.path}`).then(refresh)}
            >
              <ListItemText>Duplicate</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => deleteProject(project.path).then(refresh)}>
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
