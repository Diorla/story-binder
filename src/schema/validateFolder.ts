import Folder from "@/types/Folder";
import Ajv from "ajv";
import { folderSchema } from "./folderSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateFolder(value: Folder | null) {
  const validate = ajv.compile(folderSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: Folder = {
      id: "",
      name: "",
      note: "",
      template: "",
    };
    return fillObject(value, newValue);
  }
}
