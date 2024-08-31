export default async function deleteProject(path: string) {
  return window.api.sendMessage({
    type: "delete-directory",
    path,
  });
}
