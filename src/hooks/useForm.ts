/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const genObj = (arr: string[]) => {
  const obj: { [key: string]: string } = {};
  arr.forEach((item) => {
    obj[item] = "";
  });
  return obj;
};

/**
 * @example const { register, handleSubmit, formState, setValue, setError } = useForm<{name: string; hobbies: string[]}>({defaultValue: {name: "", hobbies: []}, required: ["name"]})
 * @param defaultValue - the default value of the form
 * @param required - the required fields of the form (optional)
 * @returns
 */
export default function useForm<T extends object>({
  defaultValue,
  required = [],
}: {
  defaultValue: T;
  required?: (keyof T)[];
}) {
  const [form, setForm] = useState<T>({ ...defaultValue });
  const [formState, setFormState] = useState(
    genObj(Object.keys(form as Record<string, any>))
  );

  /**
   * This returns all the basic things a form needs
   * @example <Input label="Name" placeholder="John doe" {...register("name")}/>
   * @param value - the name of the field is being targetted
   * @returns onChangeText, onUpdate, onBlur, onFocus, value, errortext
   */
  const register = (value: keyof T) => {
    return {
      // Can be used to directly with forms
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setForm((prev) => ({ ...prev, [value]: e.target.value }));
      },

      // Another way to update forms, can be used with elements that
      // doesn't have onChange
      onUpdate: (result: any) => {
        setForm((prev) => ({ ...prev, [value]: result }));
      },

      // responds to the onblur event in input and will update the error text
      onBlur: () => {
        if (required.includes(value) && !form[value])
          setFormState((prev) => ({
            ...prev,
            [value]: "This field is required",
          }));
      },

      // responds to the onfocus event in input and will update the error text
      onFocus: () => {
        setFormState((prev) => ({
          ...prev,
          [value]: "",
        }));
      },

      // the value of the form
      value: form[value] as any,

      // if there is any error, or if it is required but not filled
      errortext: formState[value as string],
    };
  };

  // Can be used to update form externally
  /**
   * @example setValue("name", "John Doe")
   * @example setValue("hobbies", ["coding", "reading"])
   * @example setValue("age", 20)
   * @example setValue("isMarried", true)
   */
  const setValue = (key: keyof T, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Can be used to update error externally
  /**
   * @example setValue("name", "Name must be at least more than 3 characters")
   * @example setValue("hobbies", "List cannot be empty")
   */
  const setError = (key: keyof T, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // it will return the data if it passes all checks
  // well the check is if all required fields are filled
  /**
   * @example <Button onPress={handleSubmit((data) => data && submit(data))}/>
   * @param fn - the function to be called if the form is valid
   * @returns a function that can be called to submit the form
   */
  const handleSubmit = (fn: (value?: T) => void) => {
    return () => {
      if (required.some((key) => !form[key])) {
        required.forEach((key) => {
          if (!form[key]) {
            setFormState((prev) => ({
              ...prev,
              [key]: "This field is required",
            }));
          }
        });
        return () => {
          fn();
        };
      }
      fn(form);
    };
  };

  const resetForm = (value?: Partial<T>) => {
    const resetValue = value || {};
    setForm({ ...defaultValue, ...resetValue });
  };

  /**
   * @example getValue("name") // "John Doe"
   * @example getValue("hobbies") // ["coding", "reading"]
   * @example getValue("age") // 20
   * @example getValue("isMarried") // true
   */
  const getValue = (key: keyof T) => {
    return form[key];
  };

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    setError,
    resetForm,
    getValue,
    form,
  };
}
