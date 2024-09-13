import Filter from "@/types/Filter";
import Ajv from "ajv";
const ajv = new Ajv();
import { filterSchema } from "./filterSchema";
import fillObject from "@/scripts/fillObject";

export default function validateFilter(value: Filter) {
  const validate = ajv.compile(filterSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: Filter = {
      images: {
        name: "",
        extensions: [],
      },
      pdf: {
        name: "",
        extensions: [],
      },
      all: {
        name: "",
        extensions: [],
      },
      db: {
        name: "",
        extensions: [],
      },
      app: {
        name: "",
        extensions: [],
      },
    };
    return fillObject(value, newValue);
  }
}
