import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Card, Typography, Divider, TextField } from "@mui/material";
import cover from "@/assets/placeholder";
import useForm from "@/hooks/useForm";
import useApp from "@/context/app/useApp";
import ProjectInfo from "@/types/ProjectInfo";
import ImagePicker from "@/components/ImagePicker";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import logError from "@/scripts/logError";
import { useProject } from "@/context/project/useProject";

const initialProject = {
  name: "",
  summary: "",
  cover,
};

export default function EditProject({ project }: { project: ProjectInfo }) {
  const { handleSubmit, register } = useForm<ProjectInfo>({
    defaultValue: { ...initialProject, ...project },
    required: ["name"],
  });

  const { updateProject } = useProject();
  const { workspace } = useApp();
  const submit = (form: ProjectInfo) => {
    const dir = `${workspace}/${project.name}.${APP_FILE_EXT}`;
    window.fs
      .sendMessage({
        type: "write-file",
        dir: `${dir}/.config`,
        content: JSON.stringify(form),
      })
      .then(() => {
        if (project.name !== form.name) {
          window.fs.sendMessage({
            type: "rename-directory",
            dir: `${workspace}/${project.name}.${APP_FILE_EXT}`,
            content: `${workspace}/${form.name}.${APP_FILE_EXT}`,
          });
        }
      })
      .then(() => updateProject(form))
      .catch((err) => {
        logError(err);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Box>
        <ImagePicker
          style={{ aspectRatio: 5.5 / 8.5, width: 200 }}
          {...register("cover")}
        />
      </Box>

      <Card sx={{ flex: 1, maxWidth: 600, ml: 2 }}>
        <Typography sx={{ pt: 1, pl: 1 }}>Details</Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
            m: 4,
          }}
        >
          <TextField
            label="Title"
            variant="standard"
            {...register("name")}
            error={!!register("name").errortext}
            helperText={register("name").errortext}
          />
          <TextField
            label="Summary"
            variant="outlined"
            rows={4}
            sx={{ mt: 2 }}
            {...register("summary")}
            multiline
          />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
        >
          <Button onClick={handleSubmit((data) => submit(data))}>Submit</Button>
        </Box>
      </Card>
    </Box>
  );
}
