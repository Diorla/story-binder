type ReferenceTemplate = {
  type: "reference";
  // Points to a template in your library
  // For example, relationship, this allows you to pick two characters (objects)
  // But it would look up using character template id
  templateId: string;
  value: string;
};
export default ReferenceTemplate;
