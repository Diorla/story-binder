import Container from "@mui/material/Container";
import TopBar from "./top-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      style={{ minHeight: "100vh" }}
    >
      <TopBar />
      <div style={{ height: 30 }} />
      {children}
    </Container>
  );
}
