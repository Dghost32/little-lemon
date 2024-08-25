import { useState } from "react";
import { KeyboardType, TextInputProps } from "react-native";

type Value<T> = TextInputProps["value"] | T;
type FormData<T = string> = Record<
  string,
  {
    value: Value<T>;
    optional: boolean;
    error: boolean;
    label?: string;
    placeholder?: string;
    keyboardType?: KeyboardType;
    autoComplete?: string;
    name?: string;
  }
>;

type Props<T> = {
  defaultValues: FormData<T>;
};

function useForm<T>({ defaultValues }: Props<T>) {
  const [values, setValues] = useState(defaultValues);

  function clear() {
    setValues(defaultValues);
  }

  function handleChange(name: string, value: Value<T>) {
    setValues((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, error: false },
    }));
  }

  function validate(callback?: (temp: FormData<T>) => boolean) {
    let isValid = true;

    const temp: FormData<T> = { ...values };

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

  function submit(callback: (values: FormData<T>) => void) {
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
