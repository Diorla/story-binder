import { useState } from "react";
import useTemplateContext from "./useTemplateContext";
import { TemplatePath } from "./TemplatePath";
import Nav from "./Nav";
import Body from "./Body";

export default function TemplateConsumer() {
  const [path, setPath] = useState<TemplatePath>("editor");
  const { form, register, handleSubmit, resetForm } = useTemplateContext();

  return (
    <>
      <Nav form={form} setPath={setPath} path={path} />
      <Body
        form={form}
        path={path}
        register={register}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        setPath={setPath}
      />
    </>
  );
}
