import AsyncStorage from "@react-native-async-storage/async-storage";
import useAsyncStorageState from "./useAsyncStorageState";

function useAsyncStorage() {
  const [keys, setKeys] = useAsyncStorageState<string[]>({
    key: "keys",
    initialValue: [],
  });

  async function save(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
      if(!keys.includes(key)) {
        setKeys((prev) => [...prev, key]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function get(key: string) {
    try {
      let item = await AsyncStorage.getItem(key);
      return item;
    } catch (error) {
      console.error(error);
    }
  }

  async function remove(key: string) {
    setKeys((prev) => prev.filter((k) => k !== key));
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }

  async function clear() {
    try {
      await AsyncStorage.clear();
      setKeys([]);
    } catch (error) {
      console.error(error);
    }
  }

  return { save, get, remove, keys, clear };
}

export default useAsyncStorage;
