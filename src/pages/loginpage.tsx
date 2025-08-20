import LoginForm from "../components/loginform";
import bgImage from "../assets/log-in-placeholder-bg.jpg";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);

  useEffect(() => {
    document.title = "WPESFMS - Login";
  }, []);

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
      <div
        className="relative w-full h-full hidden lg:flex bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(22,163,74,0.25),rgba(8,61,28,1))]" />
        <img src="/logo.png" alt="WPES LOGO" className="scale-50 z-50" />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
