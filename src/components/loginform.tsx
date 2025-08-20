import { Eye, EyeOff, Lock, MailIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

type LoginFormType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [remember, setRemember] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  console.log(formData);

  return (
    <form
      onSubmit={handleSubmit}
      id="loginForm"
      className="bg-background w-full h-full flex justify-center items-center text-black "
    >
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
              placeholder="email@example.com"
              className="pr-10"
              onChange={handleChange}
            />
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
                className="pr-10"
                onChange={handleChange}
              />
              <Button
                className="absolute top-0 right-1 hover:bg-transparent hover:scale-125 text-foreground"
                variant={"link"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </section>
            <section className="flex justify-between">
              <section className="flex gap-2 items-center">
                <Checkbox
                  checked={remember}
                  onCheckedChange={() => setRemember(!remember)}
                ></Checkbox>
                <p className="text-sm text-foreground">Remember me</p>
              </section>
              <a className="text-sm text-foreground underline-offset-4 hover:underline cursor-pointer">
                Forgot Password?
              </a>
            </section>
          </section>
        </div>
        <Button className="cursor-pointer" type="submit" form="loginForm">
          Login
        </Button>
        <div className="text-center text-sm text-foreground">
          {"Don't have an account? "}
          <a
            href="#"
            className="hover:underline underline-offset-4 font-semibold"
          >
            Sign up
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
