import LoginForm from "../components/loginform";
import bgImage from "../assets/log-in-placeholder-bg.jpg";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";

const LoginPage = () => {
  const { setTheme, theme } = useTheme();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);

  const handleThemeChange = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  let toastId: string | number;

  useEffect(() => {
    if (!isOnline) {
      toastId = toast.loading("Connection lost. Attempting to reconnect...");
      setIsReconnecting(true);
    } else {
      if (isReconnecting) {
        toast.dismiss(toastId);
        toast.success("Reconnected Successfully!");
        setIsReconnecting(false);
      }
    }
  }, [isOnline, isReconnecting]);

  return (
    <div className="h-screen w-screen flex bg-background">
      <div className="absolute z-50 top-2 w-full font-mono text-xl">
        <div className="flex items-center justify-end rounded-full p-4">
          WPESFMS
        </div>
      </div>
      <div className="absolute top-5 left-5 z-50">
        <Switch
          checked={theme === "dark"}
          onCheckedChange={handleThemeChange}
          className="scale-150"
        />
      </div>
      <div
        className="relative w-full h-full hidden lg:flex bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(22,163,74,0.25),rgba(8,61,28,1))]"></div>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
