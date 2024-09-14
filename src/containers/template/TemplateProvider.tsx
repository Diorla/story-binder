import useForm from "@/hooks/useForm";
import React, { useState } from "react";
import useRouter from "@/context/router/useRouter";
import { defaultTemplate } from "./defaultTemplate";
import { TemplateContext } from "./TemplateContext";
import { useAsync, useEffectOnce } from "react-use";
import Template from "@/types/Template";
import useApp from "@/context/app/useApp";

export default function TemplateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    userInfo: { templatePath },
  } = useApp();
  const { params } = useRouter<Template>();
  const { register, form, handleSubmit, resetForm } = useForm<Template>({
    defaultValue: {
      ...defaultTemplate,
    },
    required: ["name"],
  });
  const [loading, setLoading] = useState(true);

  const id = params?.id || form.id;
  useEffectOnce(() => {
    if (id) {
      window.api
        .sendMessage({
          type: "read-file",
          path: `${templatePath}/${id}`,
        })
        .then((data) => {
          resetForm(data as Template);
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  });

  useAsync(async () => {
    if (form.id)
      window.api.sendMessage({
        type: "write-file",
        path: `${templatePath}/${form.id}`,
        content: form,
      });
  }, [form]);

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
