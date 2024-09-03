export default async function selectWorkspace() {
  const directory = await window.api.sendMessage({
    type: "select-directory",
  });

  const path = directory + "/index";

  window.api.sendMessage({
    type: "write-file",
    path,
    content: {},
  });

  return directory;
}
