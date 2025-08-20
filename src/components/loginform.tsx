import { Eye, EyeOff, Loader, Lock, MailIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";
import { Switch } from "./ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type LoginFormType = {
  email: string;
  password: string;
};

type UserType = {
  email: string;
  password: string;
  token: string;
};

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [errors, setError] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("auth") || sessionStorage.getItem("auth")) {
      navigate("/dashboard");
    }
  }, []);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRemember = (checked: boolean) => {
    setRemember(checked);
    localStorage.setItem("remember", String(checked));
  };

  const [remember, setRemember] = useState<boolean>(false);

  useEffect(() => {
    setRemember(localStorage.getItem("remember") === "true");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuth = (data: Array<UserType>) => {
    if (!formData.email || !formData.password) {
      setError({
        email: formData.email ? "" : "Please enter your email address",
        password: formData.password ? "" : "Please enter your password",
      });
      return;
    }

    const validUser = data.find((user) => user.email === formData.email);

    if (!validUser) {
      setError((prev) => ({
        ...prev,
        email: "No account found with this email address",
      }));
      return;
    } else {
      if (validUser.password !== formData.password) {
        setError((prev) => ({
          ...prev,
          password: "The password you entered is incorrect",
        }));
        return;
      } else {
        if (remember) {
          localStorage.setItem("auth", JSON.stringify(validUser));
        } else {
          sessionStorage.setItem("auth", JSON.stringify(validUser));
        }
        navigate("/dashboard");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        handleAuth(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="loginForm"
      className="bg-background w-full h-full flex justify-center items-center text-black "
    >
      <div className="absolute top-5 right-5">
        <Switch />
      </div>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            FACULTY LOGIN PORTAL
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </section>
        <div className="flex flex-col gap-6">
          <section className="grid gap-3">
            <section className="flex gap-1 items-center">
              <MailIcon size={15} className="text-muted-foreground" />
              <Label
                className="hover:cursor-pointer text-foreground"
                htmlFor="email"
              >
                Email
              </Label>
            </section>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="email@example.com"
              className={cn(
                "pr-10 text-foreground",
                errors.email && "ring ring-destructive "
              )}
              onChange={(e) => {
                handleChange(e);
                if (errors.email) {
                  setError((prev) => ({ ...prev, email: "" }));
                }
              }}
            />
            {errors.email && (
              <p className="text-xs font-bold text-destructive">
                {errors.email}
              </p>
            )}
          </section>
          <section className="grid gap-3">
            <section className="flex gap-1 items-center">
              <Lock size={15} className="text-muted-foreground" />
              <Label
                className="hover:cursor-pointer text-foreground"
                htmlFor="password"
              >
                Password
              </Label>
            </section>

            <section className="relative">
              <Input
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                className={cn(
                  "pr-10 text-foreground",
                  errors.password && "ring ring-destructive"
                )}
                onChange={(e) => {
                  handleChange(e);
                  if (errors.password) {
                    setError((prev) => ({ ...prev, password: "" }));
                  }
                }}
              />
              <Button
                className="absolute top-0 right-1 hover:bg-transparent hover:scale-125 text-foreground"
                variant={"link"}
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </section>

            {errors.password && (
              <p className="text-xs font-bold text-destructive">
                {errors.password}
              </p>
            )}

            <section className="flex justify-between">
              <section className="flex gap-2 items-center">
                <Checkbox
                  checked={remember}
                  onCheckedChange={(checked) =>
                    handleRemember(checked as boolean)
                  }
                ></Checkbox>
                <p className="text-sm text-foreground">Remember me</p>
              </section>
              <Link
                to={isLoading ? "#" : "/retrievepassword"}
                className="text-sm text-foreground underline-offset-4 hover:underline cursor-pointer"
              >
                Forgot Password?
              </Link>
            </section>
          </section>
        </div>
        <Button
          className="cursor-pointer"
          type="submit"
          form="loginForm"
          disabled={isLoading}
        >
          {isLoading ? (
            <section className="flex items-center gap-2">
              <Loader className="animate-spin" />
              <p>Loging in...</p>
            </section>
          ) : (
            <section>
              <p>Login</p>
            </section>
          )}
        </Button>
        <div className="text-center text-sm text-foreground">
          {"Don't have an account? "}
          <Link
            to={isLoading ? "#" : "/signup"}
            className="hover:underline underline-offset-4 font-semibold"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
