import Folder from "@/types/Folder";
import Ajv from "ajv";
import { directorySchema } from "./directorySchema";
const ajv = new Ajv();

export default function validateFolder(value: Folder) {
  const validate = ajv.compile(directorySchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: Folder = {
      id: "",
      name: "",
      note: "",
      template: "",
    };
    return newValue;
  }
}
