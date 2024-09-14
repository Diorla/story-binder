import BROWSER from "@/constants/BROWSER";
import useLocalState from "@/hooks/useLocalState";
import { Button, Container, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useApp from "./useApp";

const count = 14;
export default function Onboarding() {
  const [page, setPage] = useLocalState("onboarding-page", 1);
  const { updateUserInfo } = useApp();
  const isCompleted = page === count;

  const isCompleteClass = isCompleted ? "completed" : "";
  const className = `onboarding onboarding-${page} ${isCompleteClass}`;

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ minHeight: BROWSER.HEIGHT }}
    >
      <Stack style={{ minHeight: BROWSER.HEIGHT }}>
        <Stack style={{ flex: 1, backgroundColor: "transparent" }}>
          <Stack style={{ flex: 1 }} className={className}>
            {isCompleted ? (
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                You have completed the onboarding process
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </Stack>
        <Stack sx={{ alignItems: "center", m: 1 }}>
          <Pagination
            count={count}
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
