import { useState } from "react";
import { TextInputProps } from "react-native";

type Value = TextInputProps["value"];
type FormData = Record<
  string,
  { value: Value; optional: boolean; error: boolean }
>;

type Props = {
  defaultValues: FormData;
};

function useForm({ defaultValues }: Props) {
  const [values, setValues] = useState(defaultValues);

  function clear() {
    setValues(defaultValues);
  }

  function handleChange(name: string, value: Value) {
    setValues((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, error: false},
    }));
  }

  function validate(callback?: (temp: FormData) => boolean) {
    let isValid = true;

    const temp: FormData = { ...values };

    for (const [_, value] of Object.entries(temp)) {
      if (!value.optional && !value.value) {
        value.error = true;
        isValid = false;
      }
    }

    if (callback) {
      let response = callback(temp);
      isValid = isValid ? response : isValid;
    }

    setValues(temp);

    return isValid;
  }

  function submit(callback: (values: FormData) => void) {
    callback(values);
  }

  return {
    values,
    setValues,
    handleChange,
    clear,
    validate,
    submit,
  };
}

export default useForm;
