import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AppointmentData,
  AppointmentDataList,
  AppointmentInput,
} from "../types";
import * as userService from "../services/user.service";
import * as appointmentService from "../services/appointment.service";

interface AppointmentContextType {
  appointmentData: AppointmentDataList | null;
  loading: boolean;
  error: string | null;
  createAppointment: (data: AppointmentInput) => Promise<AppointmentData>;
  getAppointmentById: (id: string) => Promise<AppointmentData>;
  updateAppointmentById: (
    id: string,
    data: AppointmentInput
  ) => Promise<AppointmentData>;
  getAppointmentsByUserToken: () => Promise<AppointmentData[]>;
  selectAppointment: (id: string) => void;
  removeAppointment: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

interface AppointmentProviderProps {
  children: React.ReactNode;
}

export const AppointmentProvider = ({ children }: AppointmentProviderProps) => {
  const [appointmentData, setAppointmentData] = useState<AppointmentDataList>({
    appointments: undefined,
    appointment: undefined,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!appointmentData.appointments) {
      getAppointmentsByUserToken();
    } else {
      setLoading(false);
    }
  }, []);

  const getAppointmentsByUserToken = async () => {
    try {
      setLoading(true);
      const response = await userService.getUserAppointments();

      setAppointmentData({
        ...appointmentData,
        appointments: response.data,
      });
      return response.data;
    } catch (err: any) {
      console.error("Error fetching dentists:", err);
      setError(
        err.response?.data?.message || "An error occurred during fetching"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const selectAppointment = (id: string) => {
    try {
      const selectedAppointment = appointmentData.appointments?.find(
        (appointment) => appointment.id == id
      );

      setAppointmentData({
        ...appointmentData,
        appointment: selectedAppointment as AppointmentData | undefined,
      });
    } catch (err: any) {
      console.error("Error fetching dentist:", err);
      setError(
        err.response?.data?.message || "An error occurred during fetching"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const removeAppointment = () => {
    try {
      setAppointmentData({
        ...appointmentData,
        appointment: undefined,
      });
    } catch (err: any) {
      console.error("Error fetching dentist:", err);
      setError(
        err.response?.data?.message || "An error occurred during fetching"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentById = async (id: string) => {
    try {
      setLoading(true);
      const response = await appointmentService.getAppointmentById(id);
      setAppointmentData({
        ...appointmentData,
        appointment: response.data,
      });

      return response.data;
    } catch (err: any) {
      console.error("Error fetching dentists:", err);
      setError(
        err.response?.data?.message || "An error occurred during fetching"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (data: AppointmentInput) => {
    try {
      setLoading(true);
      const response = await appointmentService.createAppointment(data);
      if (response.data) {
        getAppointmentsByUserToken();
      }

      return response.data;
    } catch (err: any) {
      console.error("Error fetching dentists:", err);
      setError(
        err.response?.data?.message || "An error occurred during fetching"
      );
      throw err;
    } finally {
      setLoading(false);
      removeAppointment();
    }
  };

  const updateAppointmentById = async (id: string, data: AppointmentInput) => {
    try {
      setLoading(true);
      const response = await appointmentService.updateAppointmentById(id, data);

      if (response.data) {
        getAppointmentsByUserToken();
      }
      return response.data;
    } catch (err: any) {
      console.error("Error fetching dentists:", err);
      setError(
        err.response?.data?.message || "An error occurred during fetching"
      );
      throw err;
    } finally {
      setLoading(false);
      removeAppointment();
    }
  };

  const value: AppointmentContextType = {
    loading,
    error,
    removeAppointment,
    createAppointment,
    updateAppointmentById,
    getAppointmentsByUserToken,
    getAppointmentById,
    selectAppointment,
    appointmentData: appointmentData || null,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointment must be used within a AppointmentProvider");
  }
  return context;
};
