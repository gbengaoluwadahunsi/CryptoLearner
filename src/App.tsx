import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
  Navigate,
} from "react-router-dom";
import { Todo, Learnerlayout, SignIn, Footer, Home } from "./pages";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DashBoard from "./pages/Dashboard/DashBoard";
import { AuthProvider } from "./context/AuthContext";
import { CryptoDetails } from "./pages/LearnerComponent/CryptoDetails";
import NotAuthorized from "./pages/NotAuthorized";

import { useAuth } from "./context/AuthContext";

const AppContent = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  // Check if the current route is a known route
  const isKnownRoute = [
    "/",
    "/todo",
    "/signin",
    "/forgot-password",
    "/reset-password/:token",
    "/coins/:id",
  ].some((path) => matchPath({ path, end: true }, location.pathname));

  // Conditionally render Navbar and Footer only if user is authorized or on known routes
  const shouldRenderNavbarFooter = isAdmin || isKnownRoute;

  return (
    <>
      {/* Conditionally render Navbar and Footer */}
      {shouldRenderNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/learn" element={<Learnerlayout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/coins/:id" element={<CryptoDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {isAdmin ? (
          <Route path="/dashboard" element={<DashBoard />} />
        ) : (
          <Route path="*" element={<Navigate to="/not-authorized" replace />} />
        )}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {shouldRenderNavbarFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <main className="bg-slate-800 min-h-screen">
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </main>
  );
};

export default App;
