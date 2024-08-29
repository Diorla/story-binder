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
import useOpenProject from "@/hooks/useOpenProject";
import BOOK_DIMENSION from "@/constants/BOOK_DIMENSION";

const { width, height } = BOOK_DIMENSION;

export default function CreateProject() {
  const openProject = useOpenProject();
  const { handleSubmit, register } = useForm<ProjectInfo>({
    defaultValue: {
      name: "",
      summary: "",
      cover,
    },
    required: ["name"],
  });

  const {
    userInfo: { workspace },
  } = useApp();

  const submit = (form: ProjectInfo) => {
    const path = `${workspace}/${form.name}`;

    window.api
      .sendMessage({
        type: "create-directory",
        path,
      })
      .then(() => {
        window.api
          .sendMessage({
            type: "write-file",
            path: `${path}/.config`,
            content: JSON.stringify(form),
          })
          .then(() => {
            openProject(form);
          });
      })
      .catch((err) => {
        logError("create-project", "submit", err);
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
          style={{ aspectRatio: width / height, width: 200 }}
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
