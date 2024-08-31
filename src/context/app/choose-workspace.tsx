import BROWSER from "@/constants/BROWSER";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import selectWorkspace from "./selectWorkspace";
import useApp from "./useApp";

export default function ChooseWorkspace() {
  const { updateUserInfo } = useApp();
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
          <Button
            variant="contained"
            onClick={() =>
              selectWorkspace().then((workspace: string) =>
                updateUserInfo({ workspace })
              )
            }
          >
            Open folder
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
