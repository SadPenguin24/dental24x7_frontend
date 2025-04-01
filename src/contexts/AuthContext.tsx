import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginData, RegisterData } from "../types";
import * as authService from "../services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<object>;
  register: (data: RegisterData) => Promise<object>;
  fetchUserProfile: () => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(data);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      setIsAuthenticated(true);

      return response.user as object;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { user } = await authService.getProfile();
      setUser(user);
      setIsAuthenticated(true);

      return user as User;
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      setError(
        err.response?.data?.message || "An error occurred during fetching"
      );
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.register(data);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      setIsAuthenticated(true);

      return response.user as object;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          login,
          logout,
          register,
          loading,
          error,
          isAuthenticated,
          user,
          fetchUserProfile,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
