import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useAsyncStorageState<T extends unknown>({
  key,
  initialValue,
}: Props<T>): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);

  async function save() {
    try {
      await AsyncStorage.setItem(
        key,
        JSON.stringify({
          key: value,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function restore() {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        const { key: storedValue } = JSON.parse(item);
        setValue(storedValue ?? value);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    restore();

    return setValue((value) => value);
  }, []);

  useEffect(() => {
    save();
  }, [value]);

  return [value, setValue, loading];

}

interface Props<T> {
  initialValue: T;
  key: string;
}
