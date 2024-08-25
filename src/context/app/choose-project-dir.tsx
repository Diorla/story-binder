import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import logError from "@/scripts/logError";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function ChooseProjectDir({
  confirmDir,
}: {
  confirmDir: (dir: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const openFile = async () => {
    setLoading(true);
    window.dialog
      .selectDir()
      .then((value) => {
        window.fs.sendMessage({
          type: "write-file",
          dir: USER_INFO_DIR,
          content: JSON.stringify({
            ...INITIAL_USER_INFO,
            projectDir: value as string,
            onboardCompleted: true,
          }),
        });
        confirmDir(value as string);
      })
      .catch((err: Error) => {
        logError(err);
        setLoading(false);
      });
  };

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
          <Grid>Hi there, please select a folder to save all your files</Grid>
          <Button variant="contained" onClick={openFile} disabled={loading}>
            open folder
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
