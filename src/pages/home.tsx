import Home from "@/containers/home";
import Provider from "@/containers/home/Provider";

export default function HomePage() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}
