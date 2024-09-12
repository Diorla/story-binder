export default function deleteFolder(id: string, projectPath: string) {
  return window.api.sendMessage({
    type: "delete-directory",
    path: `${projectPath}/${id}`,
  });
}
