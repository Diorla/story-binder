import useRouter from "@/context/router/useRouter";
import { Box, Button, Typography } from "@mui/material";
import folder from "@/assets/folder";
import BROWSER from "@/constants/BROWSER";

export default function EmptyProject() {
  const { navigate } = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: BROWSER.HEIGHT,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <img src={folder} alt="folder" style={{ height: 200, width: 200 }} />
        <Typography variant="h3">No Projects yet</Typography>
        <Typography>
          Such empty. Looks like you have not created any project yet. Click on
          the button to get started
        </Typography>
        <Button
          onClick={() => navigate("create-project")}
          sx={{ mt: 1 }}
          variant="contained"
        >
          Add Project
        </Button>
      </Box>
    </Box>
  );
}
