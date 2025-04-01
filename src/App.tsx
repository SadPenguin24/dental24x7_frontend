import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
// import { ProtectedRoute } from "./components/providers/ProtectedRoute";
import NavBar from "./components/utils/NavBar";
import Footer from "./components/utils/Footer";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BookingPage from "./pages/BookingPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { ProtectedRoute } from "./components/providers/ProtectedRoute";
import { DentistProvider } from "./contexts/DentistContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <Toaster visibleToasts={9} />
      <DentistProvider>
        <AppointmentProvider>
          <Router>
            <div className="flex min-h-screen flex-col ">
              <NavBar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/booking"
                    element={
                      <ProtectedRoute>
                        <BookingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AppointmentProvider>
      </DentistProvider>
    </AuthProvider>
  );
}

export default App;
