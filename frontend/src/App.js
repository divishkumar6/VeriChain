import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Particles from "./components/Particles";
import GlowBackground from "./components/GlowBackground";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import InstitutionPortal from "./pages/InstitutionPortal";
import StudentPortal from "./pages/StudentPortal";
import AdminDashboard from "./pages/AdminDashboard";
import UploadCertificate from "./pages/UploadCertificate";
import VerifyCertificate from "./pages/VerifyCertificate";
import { GlobalActivityProvider } from "./context/GlobalActivityContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function HomeRoute() {
  const location = useLocation();
  const certificateId = new URLSearchParams(
    location.search
  ).get("certificateId");

  if (certificateId) {
    return <VerifyCertificate />;
  }

  return <LandingPage />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalActivityProvider>
          <div className="relative min-h-screen overflow-hidden bg-primary text-white">
            <Particles />
            <GlowBackground />

          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/institution"
              element={
                <ProtectedRoute allowedRole="institution">
                  <InstitutionPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute allowedRole="institution">
                  <UploadCertificate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify"
              element={
                <ProtectedRoute allowedRole="student">
                  <VerifyCertificate />
                </ProtectedRoute>
              }
            />
            <Route path="/verify/:certificateId" element={<VerifyCertificate />} />
          </Routes>
          </div>
        </GlobalActivityProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
