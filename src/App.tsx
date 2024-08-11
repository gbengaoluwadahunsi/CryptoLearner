import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from "react-router-dom";
import { Todo, Learner, Market, SignIn, Footer, Home } from "./pages";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DashBoard from "./pages/Dashboard/DashBoard";
import { AuthProvider } from "./context/AuthContext";

const AppContent = () => {
  const location = useLocation();

  // Check if the current route is a known route
  const isKnownRoute = [
    '/',
    '/todo',
    '/learn',
    '/market-news',
    '/signin',
    '/forgot-password',
    '/dashboard',
    '/reset-password/:token'
  ].some((path) => matchPath(path, location.pathname));

  return (
    <>
      {/* Conditionally render Navbar and Footer only on known routes */}
      {isKnownRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/learn" element={<Learner />} />
        <Route path="/market-news" element={<Market />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path = "/forgot-password" element = {<ForgotPassword/>}/>
        <Route path = "/reset-password/:token" element = {<ResetPassword/>}/>
        <Route path = "/dashboard" element = {<DashBoard/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isKnownRoute && <Footer />}
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
