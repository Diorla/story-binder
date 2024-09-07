import Ajv, { JSONSchemaType } from "ajv";

export default function validateData(type: "list", value: unknown) {
  const ajv = new Ajv({ allErrors: true });

  if (type === "list") {
    const arraySchema: JSONSchemaType<string[]> = {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      uniqueItems: true,
    };
    return ajv.compile(arraySchema)(value);
  }

  return () => false;
}
