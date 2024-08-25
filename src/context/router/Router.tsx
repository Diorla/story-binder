import ROUTES from "@/constants/ROUTES";
import ErrorComponent from "@/containers/error-boundary/ErrorComponent";
import NotFound from "@/pages/not-found";
import Path from "@/types/Path";

export default function Router({ path, error }: { path: Path; error?: Error }) {
  if (error) return <ErrorComponent error={error} />;
  const route = ROUTES.find((route) => route.path === path);
  return route ? route.element : <NotFound />;
}
