import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import useLocalState from "@/hooks/useLocalState";
import logError from "@/scripts/logError";
import UserInfo from "@/types/UserInfo";
import { Button, Card, Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Onboarding({
  onCompleteOnboarding,
}: {
  onCompleteOnboarding: () => void;
}) {
  const [page, setPage] = useLocalState("onboarding-page", 1);
  const isCompleted = page === 10;

  const completeOnboarding = () => {
    const content: UserInfo = { ...INITIAL_USER_INFO, onboardCompleted: true };
    window.fs
      .sendMessage({
        type: "write-file",
        dir: USER_INFO_DIR,
        content: JSON.stringify(content),
      })
      .then(() => {
        onCompleteOnboarding();
      })
      .catch((err) => {
        logError(err);
      });
  };
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      style={{ minHeight: "100vh" }}
    >
      <Stack style={{ minHeight: "100vh" }}>
        <Stack style={{ flex: 1 }}>
          <Card style={{ flex: 1 }}>
            This is where onboarding will be shown for new users {page}
          </Card>
        </Stack>
        <Stack sx={{ alignItems: "center", m: 1 }}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            onChange={(_e, page) => setPage(page)}
          />
          <Button
            onClick={completeOnboarding}
            variant="contained"
            sx={{ alignItems: "center", mt: 1 }}
          >
            {isCompleted ? "Finish" : "Skip"}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
