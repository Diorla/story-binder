export default async function selectWorkspace() {
  const directory = await window.api.sendMessage({
    type: "select-directory",
  });

  return directory;
}
