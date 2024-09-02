import DocumentInfo from "@/types/DocumentInfo";

export default function Preview({ document }: { document: DocumentInfo }) {
  console.log("document", document);
  if (document.template?.type === "form") return <div>Previewing form</div>;
  return <div>{document.content || ""}</div>;
}
