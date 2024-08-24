export type PayloadType =
  | "create-file"
  | "create-directory"
  | "read-file"
  | "read-directory"
  | "update-file"
  | "update-directory"
  | "delete-file"
  | "delete-directory";

export default interface Payload {
  type: PayloadType;
  // The file or folder that would be read or updated
  dir: string;
  // If it is a folder, then it is the name of the folder
  // For a file, it will be JSON.stringified value or dataUri
  content?: string;
}
