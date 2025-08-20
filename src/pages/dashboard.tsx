import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "WPESFMS - Dashboard";
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div>
      <div className="absolute top-5 right-5">
        <Switch />
      </div>
      <div className="w-screen h-screen items-center flex flex-col justify-center">
        <div>DASHBOARD</div>
        <Button onClick={() => handleLogOut()}>LOGOUT</Button>
      </div>
    </div>
  );
};

export default Dashboard;
