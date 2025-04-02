import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    navigate("/login");
    return;
  }

  return <>{children}</>;
};
