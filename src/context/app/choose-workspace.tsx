// import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
// import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
// import useContextState from "@/hooks/useContextState";
// import logError from "@/scripts/logError";
// import UserInfo from "@/types/UserInfo";
import BROWSER from "@/constants/BROWSER";
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
      id="choose-workspace-container"
      maxWidth={false}
      disableGutters={true}
      style={{ minHeight: BROWSER.HEIGHT }}
    >
      <Stack style={{ minHeight: BROWSER.HEIGHT }}>
        <Stack
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Typography variant="h4">Select Workspace</Typography>
          <Typography>Please select a folder to save all you work</Typography>
          <Button variant="contained" onClick={changeWorkspace}>
            Open folder
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
