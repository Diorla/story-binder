import ROUTES from "@/constants/ROUTES";
import NotFound from "@/pages/not-found";
import Path from "@/types/Path";

export default function Router({ path }: { path: Path }) {
  const route = ROUTES.find((route) => route.path === path);
  return route ? route.element : <NotFound />;
}
