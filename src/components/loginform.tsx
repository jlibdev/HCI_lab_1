import { Eye, EyeOff, Loader, Lock, MailIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";
import { Switch } from "./ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type UserType = {
  email: string;
  password: string;
};

// Most input components already have hover, focus , pressed effects achieving "Feedback and Responsiveness" , custom visibility toggle used "scale" on hover for more emphasis

const LoginForm = () => {
  const navigate = useNavigate();

  // Component States
  const [isLoading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [remember, setRemember] = useState<boolean>(false);

  // Initialize formData
  const [formData, setFormData] = useState<UserType>({
    email: "",
    password: "",
  });

  // Initialize formData errors
  const [errors, setError] = useState<UserType>({
    email: "",
    password: "",
  });

  // Check if there is a remembered user currently logged in. Simulate authenticated log in.
  useEffect(() => {
    if (localStorage.getItem("auth") || sessionStorage.getItem("auth")) {
      navigate("/dashboard");
    }
  }, []);

  // When checking remember me, stores the option so that it is saved in the browser settings
  const handleRemember = (checked: boolean) => {
    setRemember(checked);
    localStorage.setItem("remember", String(checked));
  };

  // Sets initial state of remember
  useEffect(() => {
    setRemember(localStorage.getItem("remember") === "true");
  }, []);

  // Handles Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simulate Input Validation and Error Recovery for HCI Guideline "Error Recovery"
  const handleAuth = (data: Array<UserType>) => {
    // When user fails to set any input into the required fields it will show appropriate messages
    if (!formData.email || !formData.password) {
      setError({
        email: formData.email ? "" : "Please enter your email address",
        password: formData.password ? "" : "Please enter your password",
      });
      return;
    }

    // Simulate user authentication/validation of account
    const validUser = data.find((user) => user.email === formData.email);

    // Set appropriate error messages for when input does not match expected inputs
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
        // If Input is valid then if remember is checked, it will save user into localStorage (no backend) for persistent log in status
        if (remember) {
          localStorage.setItem("auth", JSON.stringify(validUser));
        } else {
          // Else it will be saved into sessionStorage for persistent auth during session
          sessionStorage.setItem("auth", JSON.stringify(validUser));
        }
        navigate("/dashboard");
      }
    }
  };

  // Simulate form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Add delay of 1.5 seconds
    setTimeout(async () => {
      try {
        // Retrieve json data from preset file
        const response = await fetch("/users.json");
        const data = await response.json();
        handleAuth(data.users);
      } catch (error) {
        // Feedback to user if an error occured, specially if the users.json is not found
        toast.error("An Error Occured During User Authentication...");
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
        {/* Light/Dark Mode Toggle in accordance to HCI Guideline "Customization and Personalization" */}
        <Switch />
      </div>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col items-center gap-2 text-center">
          <img
            src="/WPESFMS.svg"
            alt="wpeslogo"
            className="size-36 translate-y-5"
          />
          <h1 className="text-2xl font-bold text-foreground">
            Faculty Login Portal
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </section>
        <div className="flex flex-col gap-6">
          <section className="grid gap-3">
            <section className="flex gap-1 items-center">
              {/* Adding Icons with label for HCI Guideline "Match Between System and Real World"  */}
              <MailIcon size={15} className="text-muted-foreground" />
              <Label
                className="hover:cursor-pointer text-foreground"
                htmlFor="email"
              >
                Email
              </Label>
            </section>
            {/* Follow HCI guideline for "Error Prevention" and Accessibility : 
                set type to email to accept valid email formats,
                set a label and input pair
                set required kay sege nlang bahalg di na to mu lugwa tung "Please Input" cha cha nga error para asa sab
            */}
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="email@example.com"
              className={cn(
                "pr-10 text-foreground",
                errors.email && "ring ring-destructive "
              )}
              required
              onChange={(e) => {
                handleChange(e);
                if (errors.email) {
                  setError((prev) => ({ ...prev, email: "" }));
                }
              }}
            />
            {/* Renders the appropriate error message for the input */}
            {errors.email && (
              <p className="text-xs font-bold text-destructive">
                {errors.email}
              </p>
            )}
          </section>
          <section className="grid gap-3">
            <section className="flex gap-1 items-center">
              {/* Adding Icons with label for HCI Guideline "Match Between System and Real World"  */}
              <Lock size={15} className="text-muted-foreground" />
              <Label
                className="hover:cursor-pointer text-foreground"
                htmlFor="password"
              >
                Password
              </Label>
            </section>

            <section className="relative">
              {/* Follow HCI guideline for "Error Prevention" and Accessibility : 
                set type to password to accept valid email formats,
                set a label and input pair
                set required kay sege nlang bahalg di na to mu lugwa tung "Please Input" cha cha nga error para asa sab
            */}
              <Input
                name="password"
                required
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

              {/* Added password visibilty toggle for "User Control and Freedom" to user ability to check if input password is correct */}
              <Button
                className="absolute top-0 right-1 hover:bg-transparent hover:scale-125 text-foreground"
                variant={"link"}
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {/* for "Affordance and Discoverability" , the eye icon suggests to the user that this button toggles visiblity */}
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </section>

            {/* Renders the appropriate error message for the input  */}
            {errors.password && (
              <p className="text-xs font-bold text-destructive">
                {errors.password}
              </p>
            )}

            <section className="flex justify-between">
              <section className="flex gap-2 items-center">
                {/* Component for remember me, an option for user convenience to not be asked to log in again per session*/}
                <Checkbox
                  checked={remember}
                  onCheckedChange={(checked) =>
                    handleRemember(checked as boolean)
                  }
                ></Checkbox>
                <p className="text-sm text-foreground">Remember me</p>
              </section>
              {/* Forgot password option for when users need option to recover account */}
              <Link
                to={isLoading ? "#" : "/retrievepassword"}
                className="text-sm text-foreground underline-offset-4 hover:underline cursor-pointer"
              >
                Forgot Password?
              </Link>
            </section>
          </section>
        </div>

        {/* Button - Disabled during Submission as Feedback and Error prevention , Spinning Loading is also visible for progress indicator */}
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
        {/* Links follow consistent design pattern of having underlines when hovered..*/}
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
