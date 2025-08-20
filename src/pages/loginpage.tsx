import LoginForm from "../components/loginform";
import bgImage from "../assets/log-in-placeholder-bg.jpg";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  useEffect(() => {
    document.title = "WPESFMS - Login";
  }, []);

  // Shadcn components provide a foundation for the systems design system : Making component designs consistent achieving "Consistency and Standards" of HCI guidelines
  // For HCI guideline "Accessibility" , most html elements provide built in functions for that, used <img> and used alt for alt_text as well in the element
  // "Aesthetic and Minimalist Design" : Design is simple. Login form then an image with logo

  // State for network online status
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // State for network reconnecting status
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);

  // On mount check if the browser has internet connection and set state accordingly
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

  // Online status ui elements : Shows a toast/alert when internet is disconnected and when network reconnects
  // Simulate by changing the network status in browser dev tools
  let toastId: string | number;

  useEffect(() => {
    // This code tries to achieve the "Visibility of System Status" in the Specific HCI Guidelines ppt  : “You are offline” banner when internet disconnects.
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
      <div className="absolute top-5 left-5 z-50"></div>
      <div
        className="relative w-full h-full hidden md:flex bg-center bg-no-repeat bg-cover justify-center items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(22,163,74,0.25),rgba(8,61,28,1))]" />

        <img src="/logo.png" alt="WPES LOGO" className="size-96 z-50" />
      </div>

      {/* Main part of the login page */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
