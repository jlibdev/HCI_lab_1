import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "WPESFMS - Sign Up";
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-2">
      <h1 className="font-bold text-2xl">SIGN UP PAGE</h1>
      <Button className="flex items-center" onClick={() => navigate("/login")}>
        <ChevronLeft />
        <h1>Return to Login</h1>
      </Button>
    </div>
  );
};

export default SignUpPage;
