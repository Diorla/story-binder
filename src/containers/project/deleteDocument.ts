import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function deleteDocument(id: string, projectPath: string) {
  return window.api.sendMessage({
    type: "delete-file",
    path: `${projectPath}/${id}.${APP_FILE_EXT}`,
  });
}
