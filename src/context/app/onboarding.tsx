import BROWSER from "@/constants/BROWSER";
import useLocalState from "@/hooks/useLocalState";
import { Button, Card, Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useApp from "./useApp";

export default function Onboarding() {
  const [page, setPage] = useLocalState("onboarding-page", 1);
  const { updateUserInfo } = useApp();
  const isCompleted = page === 10;

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      style={{ minHeight: BROWSER.HEIGHT }}
    >
      <Stack style={{ minHeight: BROWSER.HEIGHT }}>
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
            onClick={() => {
              updateUserInfo({ onboardingCompletedAt: Date.now() });
            }}
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
