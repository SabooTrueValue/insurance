"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!theme) {
      setTheme("light"); // Default theme is "light"
    }
  }, [theme,setTheme]);

  const handleTheme = (theme: string = "light") => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) return null;

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={() => handleTheme(theme)}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
