import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default async function init(path: string) {
  const data = await window.api.sendMessage({
    type: "read-directory",
    path,
  });

  const { files } = data as { files: string[]; folders: string[] };
  const filteredFiles = files.filter(
    (item) => item !== ".config" && item.includes(APP_FILE_EXT)
  );
  const list = [];
  for (const item of filteredFiles) {
    const data = await window.api.sendMessage({
      type: "read-file",
      path: `${path}/${item}`,
    });
    const currentItem = JSON.parse(data as string);
    list.push({ ...currentItem, id: item });
  }
  return list;
}
