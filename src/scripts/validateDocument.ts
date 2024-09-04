import Ajv from "ajv";
import schema from "./documentSchema.json";
import DocumentInfo from "@/types/DocumentInfo";

const ajv = new Ajv();

const validateDocument = ajv.compile<DocumentInfo>(schema);

export default validateDocument;
