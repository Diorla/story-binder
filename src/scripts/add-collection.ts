import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default async function addCollection(
  workspace: string,
  project: string,
  collection: string
) {
  const projectDir = `${workspace}/${project}.${APP_FILE_EXT}/${collection}`;

  await window.fs.sendMessage({
    type: "write-directory",
    dir: projectDir,
  });
  const content = JSON.stringify({
    name: collection,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  await window.fs.sendMessage({
    type: "write-file",
    dir: `${projectDir}/.template`,
    content,
  });
  return collection;
}
