import { Toaster } from "sonner";
import LoginPage from "./pages/loginpage";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <LoginPage />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}

export default App;
