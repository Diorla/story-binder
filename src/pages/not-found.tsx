import useRouter from "@/context/router/useRouter";

export default function NotFound() {
  const { _lastPath } = useRouter();
  return (
    <div>
      <h1>Page not found</h1>
      <div>Your attempt to access {_lastPath} failed</div>;
    </div>
  );
}
