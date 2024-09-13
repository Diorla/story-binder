import Directory from "@/types/Directory";
import Ajv from "ajv";
import { directorySchema } from "./directorySchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateDirectory(value: Directory) {
  const validate = ajv.compile(directorySchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: Directory = {
      files: [],
      folders: [],
    };
    return fillObject(value, newValue);
  }
}
