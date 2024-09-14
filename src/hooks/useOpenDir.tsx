import useRouter from "@/context/router/useRouter";

export default function useOpenDir() {
  const { navigate } = useRouter();
  return (type: "project" | "folder" | "doc", dir: string[]) =>
    navigate(type, { dir });
}
