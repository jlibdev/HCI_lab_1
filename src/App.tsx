import { Toaster } from "sonner";
import LoginPage from "./pages/loginpage";
import { ThemeProvider } from "./components/theme-provider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErroPage from "./pages/errorpage";
import Dashboard from "./pages/dashboard";
import SignUpPage from "./pages/signup";
import ForgotPasswordPage from "./pages/passwordretrieve";

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/retrievepassword" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErroPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
