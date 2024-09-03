import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Card, Typography, Divider } from "@mui/material";
import cover from "@/assets/placeholder";
import useForm from "@/hooks/useForm";
import useApp from "@/context/app/useApp";
import ProjectInfo from "@/types/ProjectInfo";
import ImagePicker from "@/components/ImagePicker";
import logError from "@/scripts/logError";
import BOOK_DIMENSION from "@/constants/BOOK_DIMENSION";
import Input from "@/components/Input";
import SAMPLE from "@/constants/SAMPLE";
import writeProject from "../../scripts/writeProject";
import useOpenDir from "@/hooks/useOpenDir";
import { v4 } from "uuid";

const { width, height } = BOOK_DIMENSION;
export default function CreateProject() {
  const navigate = useOpenDir();
  const { handleSubmit, register } = useForm<ProjectInfo>({
    defaultValue: {
      id: "",
      name: "",
      summary: "",
      cover,
      path: "",
    },
    required: ["name"],
  });

  const {
    userInfo: { workspace },
  } = useApp();

  const submit = (form: ProjectInfo) => {
    const id = v4();
    writeProject({ ...form, id }, workspace)
      .then(() => {
        navigate("project", [id]);
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
          <Input
            label="Title"
            {...register("name")}
            sx={{ mb: 2 }}
            placeholder={SAMPLE.name}
          />
          <Input
            label="Summary"
            rows={4}
            multiline
            {...register("summary")}
            placeholder={SAMPLE.summary}
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
