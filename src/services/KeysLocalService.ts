import { Keys } from "@/models/Keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS_STORAGE_KEY = "memo-keys";

async function getKeys(): Promise<Keys[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    throw new Error(`Error retrieving keys from local storage: ${error}`);
  }
}
async function saveKeys([newKeys]: Keys[]): Promise<void> {
  try {
    const storageKeys = await getKeys();
    const jsonValue = JSON.stringify([...storageKeys, newKeys]);
    await AsyncStorage.setItem(KEYS_STORAGE_KEY, jsonValue);
  } catch (error) {
    throw new Error(`Error saving keys to local storage: ${error}`);
  }
}
async function removeKeys(id: string): Promise<void> {
  try {
    const storageKeys = await getKeys();
    const filteredKeys = storageKeys.filter((key) => key.id !== id);
    const jsonValue = JSON.stringify(filteredKeys);
    await AsyncStorage.setItem(KEYS_STORAGE_KEY, jsonValue);
  } catch (error) {
    throw new Error(`Error removing keys from local storage: ${error}`);
  }
}

export const KeysLocalService = {
  getKeys,
  saveKeys,
  removeKeys,
};
