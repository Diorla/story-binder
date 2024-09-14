import useRouter from "@/context/router/useRouter";
import { Button } from "@mui/material";

// This should have two options
// Reload app: use contextBridge
// Go home
// Report error

export default function ErrorComponent({ error }: { error: Error }) {
  const { navigate } = useRouter();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.message}</i>
      </p>
      <div>
        <Button onClick={() => navigate("home", null)}>Go back home</Button>
        <Button onClick={() => navigate("home")}>Reload app</Button>
        <Button onClick={() => navigate("home")}>Report Error</Button>
      </div>
    </div>
  );
}
