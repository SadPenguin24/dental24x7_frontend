import api from "./api";
import { AppointmentData, ProfileData, User } from "../types";

const route = "user";

export const getUserAppointments = async (): Promise<{
  data: AppointmentData[];
}> => {
  const response = await api.get(`/${route}/appointments`);
  return response.data;
};

export const updateUser = async (data: ProfileData): Promise<User> => {
  const response = await api.patch(`/${route}/update`, data);
  return response.data;
};
