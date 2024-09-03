import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Card, Typography, Divider, TextField } from "@mui/material";
import useForm from "@/hooks/useForm";
import ProjectInfo from "@/types/ProjectInfo";
import ImagePicker from "@/components/ImagePicker";
import logError from "@/scripts/logError";
import BOOK_DIMENSION from "@/constants/BOOK_DIMENSION";
import useApp from "@/context/app/useApp";
import useProjectContext from "./useProjectContext";
import writeProject from "@/scripts/writeProject";

const { width, height } = BOOK_DIMENSION;

// TODO: Add toast
/*
To confirm an updated state after clicking submit, especially for cover
and summary
*/
export default function EditProject() {
  const { project, reload } = useProjectContext();
  const { handleSubmit, register } = useForm<ProjectInfo>({
    defaultValue: project,
    required: ["name"],
  });
  const {
    userInfo: { workspace },
  } = useApp();

  const submit = (form?: ProjectInfo) => {
    if (form) {
      writeProject(form, workspace)
        .then(reload)
        .catch((err) => {
          logError("update-project", "submit", err);
        });
    }
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
            error={!!register("name").errorText}
            helperText={register("name").errorText}
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
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Button onClick={handleSubmit((data) => submit(data))}>Submit</Button>
        </Box>
      </Card>
    </Box>
  );
}
