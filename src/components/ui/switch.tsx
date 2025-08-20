import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { useTheme } from "../theme-provider";
import { Moon, Sun } from "lucide-react";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <SwitchPrimitive.Root
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      className={cn(
        "relative w-[46px] h-[26px] rounded-full bg-gray-300 data-[state=checked]:bg-gray-800 transition-colors flex items-center",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="
            block w-[22px] h-[22px] rounded-full bg-white shadow 
            transition-transform duration-200
            translate-x-0.5
            data-[state=checked]:translate-x-[22px]
            flex items-center justify-center
          "
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-gray-800" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch };
