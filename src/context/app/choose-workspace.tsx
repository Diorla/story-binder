// import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
// import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
// import useContextState from "@/hooks/useContextState";
// import logError from "@/scripts/logError";
// import UserInfo from "@/types/UserInfo";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

export default function ChooseWorkspace({
  changeWorkspace,
}: {
  changeWorkspace: () => void;
}) {
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      style={{ minHeight: "100vh" }}
    >
      <Stack style={{ minHeight: "100vh" }}>
        <Stack
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Typography variant="h4">Select Workspace</Typography>
          <Typography>
            Hi there, please select a folder (directory) to save all your files
          </Typography>
          <Button variant="contained" onClick={changeWorkspace}>
            Open folder
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
