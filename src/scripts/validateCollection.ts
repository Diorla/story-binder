import Ajv from "ajv";
import schema from "./collectionSchema.json";
import FolderConfig from "@/types/FolderConfig";

const ajv = new Ajv();

const validateCollection = ajv.compile<FolderConfig>(schema);

export default validateCollection;
