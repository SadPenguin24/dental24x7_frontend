import api from "./api";
import { AppointmentData, AppointmentInput } from "../types";

const route = "appointment";

export const createAppointment = async (
  data: AppointmentInput
): Promise<{
  data: AppointmentData;
}> => {
  const response = await api.post(`/${route}/create`, data);
  return response.data;
};

export const getAppointmentById = async (
  id: string
): Promise<{ data: AppointmentData }> => {
  const response = await api.get(`/${route}/${id}`);
  return response.data;
};
export const updateAppointmentById = async (
  id: string,
  data: AppointmentInput
): Promise<{ data: AppointmentData }> => {
  const response = await api.patch(`/${route}/update/${id}`, data);
  return response.data;
};
