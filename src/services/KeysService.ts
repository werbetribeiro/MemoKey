
import { Keys } from "@/models/Keys";
import { axiosInstance } from "./api/axiosInstance";

export const KeysService = {
  getKeys: async (): Promise<Keys[]> => {
    try {
      const { data } = await axiosInstance.get<Keys[]>("/keys");
      return data;
    } catch (error) {
      console.log(error)
      throw new Error(`Error fetching key-values: ${error}`);
    }
  },
  getKeyById: async (id: string): Promise<Keys> => {
    try {
      const { data } = await axiosInstance.get<Keys>(`/keys/${id}`);
      return data;
    } catch (error) {
      throw new Error(`Error fetching key-value with id ${id}: ${error}`);
    }
  },
  createKey: async (payload: Keys): Promise<Keys> => {
    try {
      const { data } = await axiosInstance.post<Keys>("/keys", payload);
      return data;
    } catch (error) {
      throw new Error(`Error creating key-value: ${error}`);
    }
  },
  updateKey: async (id: string): Promise<Keys> => {
    try {
      const { data } = await axiosInstance.put<Keys>(`/keys/${id}`);
      return data;
    } catch (error) {
      throw new Error(`Error updating key-value: ${error}`);
    }
  },
  deleteKey: async (id: string): Promise<Keys> => {
    try {
      const { data } = await axiosInstance.put<Keys>(`/keys/${id}`);
      return data;
    } catch (error) {
      throw new Error(`Error deletar key-value: ${error}`);
    }
  },
};
