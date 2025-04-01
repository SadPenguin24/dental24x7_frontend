import api from "./api";
import { DentistData } from "../types";

const route = "dentist";

export const getDentists = async (): Promise<{ data: DentistData[] }> => {
  const response = await api.get(`/${route}/`);
  return response.data;
};

export const getDentistById = async (
  id: string
): Promise<{ data: DentistData }> => {
  const response = await api.get(`/${route}/${id}`);
  return response.data;
};
