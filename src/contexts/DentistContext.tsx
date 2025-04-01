import React, { createContext, useContext, useEffect, useState } from "react";
import { DentistData, DentistDataList } from "../types";
import * as dentistService from "../services/dentist.service";

interface DentistContextType {
  dentistData: DentistDataList | null;
  loading: boolean;
  error: string | null;
  getDentists: () => Promise<void>;
  selectDentist: (id: string) => void;
  removeDentist: () => void;
}

const DentistContext = createContext<DentistContextType | undefined>(undefined);

interface DentistProviderProps {
  children: React.ReactNode;
}

export const DentistProvider = ({ children }: DentistProviderProps) => {
  const [dentistData, setDentistData] = useState<DentistDataList>({
    dentists: undefined,
    dentist: undefined,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dentistData.dentists) {
      getDentists();
    } else {
      setLoading(false);
    }
  }, []);

  const getDentists = async () => {
    try {
      setLoading(true);
      const response = await dentistService.getDentists();
      setDentistData({ ...dentistData, dentists: response.data });
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

  const selectDentist = (id: string) => {
    try {
      const selectedDentist = dentistData.dentists?.find(
        (dentist) => dentist.id == id
      );

      setDentistData({
        ...dentistData,
        dentist: selectedDentist as DentistData | undefined,
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
  const removeDentist = () => {
    try {
      setDentistData({
        ...dentistData,
        dentist: undefined,
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

  const value: DentistContextType = {
    loading,
    error,
    removeDentist,
    selectDentist,
    getDentists,
    dentistData: dentistData || null,
  };

  return (
    <DentistContext.Provider value={value}>{children}</DentistContext.Provider>
  );
};

export const useDentist = (): DentistContextType => {
  const context = useContext(DentistContext);
  if (context === undefined) {
    throw new Error("useDentist must be used within a DentistProvider");
  }
  return context;
};
