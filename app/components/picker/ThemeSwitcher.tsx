// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"
import { Button } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark"): setTheme("light")
  }

  return (
    <div>
      <Button onClick={toggleTheme} className={` p-2 rounded-md ${theme == "light" ? 'bg-white' :'border-white bg-black'}`}>
        {
        theme == "light" ? 
        <Sun className="h-[1.2rem] w-[1.2rem]" />:
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        }
        </Button>
    </div>
  )
};