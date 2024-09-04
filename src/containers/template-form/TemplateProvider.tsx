import useForm from "@/hooks/useForm";
import Template from "@/types/Template";
import React, { useState } from "react";
import useRouter from "@/context/router/useRouter";
import { defaultTemplate } from "./defaultTemplate";
import { TemplateContext } from "./TemplateContext";
import { useAsync, useEffectOnce } from "react-use";

export default function TemplateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { params } = useRouter<Template | null>();
  const { register, form, handleSubmit, resetForm } = useForm<Template>({
    defaultValue: {
      ...defaultTemplate,
    },
    required: ["name"],
  });
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    if (params.id) {
      window.api
        .sendMessage({
          type: "read-file",
          path: `./templates/${params.id}`,
        })
        .then((data) => {
          resetForm(data);
        })
        .then(() => {
          setLoading(false);
        });
    }
  });

  useAsync(async () => {
    if (form.id)
      window.api.sendMessage({
        type: "write-file",
        path: `./templates/${form.id}`,
        content: form,
      });
  }, [form, 1]);

  if (loading) return <div>Loading</div>;
  return (
    <TemplateContext.Provider
      value={{
        register,
        form,
        handleSubmit,
        resetForm,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}
