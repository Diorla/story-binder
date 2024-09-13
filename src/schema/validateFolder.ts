import Folder from "@/types/Folder";
import Ajv from "ajv";
import { folderSchema } from "./folderSchema";
const ajv = new Ajv();

export default function validateFolder(value: Folder) {
  const validate = ajv.compile(folderSchema);

  if (validate(value)) {
    return value;
  } else {
    return null;
  }
}
