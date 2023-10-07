import { ItemTypes } from "../Types/ItemsTypes";
import axiosClient from "../axiosClient";

export const logout = () => {
  // Implement logout logic here, e.g., clearing tokens
};

export const fetchUserItemsData = async (): Promise<ItemTypes[]> => {
  try {
    const res = await axiosClient.get("/items");
    return res.data.lists_data;
  } catch (error) {
    throw error;
  }
};
