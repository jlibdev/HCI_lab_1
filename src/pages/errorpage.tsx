import { Ban } from "lucide-react";
import { useEffect } from "react";

const ErroPage = () => {
  useEffect(() => {
    document.title = "WPESFMS - Error";
  }, []);
  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center">
      <div className="flex gap-5 items-center">
        <Ban size={50}></Ban>
        <div className="text-foreground text-4xl font-bold">PAGE NOT FOUND</div>
      </div>
    </div>
  );
};

export default ErroPage;
