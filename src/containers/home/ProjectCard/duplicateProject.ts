export default async function duplicateProject(path: string) {
  return window.api.sendMessage({
    type: "duplicate-directory",
    path,
  });
}
