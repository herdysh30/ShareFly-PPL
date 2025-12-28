import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/ThemeProvider"
import React from "react"
import * as Switch from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

export function ModeToggleClick() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function ModeToggleSwitch({id}: {id?: string}) {
    const { theme, setTheme } = useTheme()

    return (
        <Switch.Root className="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input" 
        id={id}
        checked={theme === 'dark'}
        onCheckedChange={()=>{
            theme === 'dark' ? setTheme('light') : setTheme('dark')
        }}>
            <Switch.Thumb className="pointer-events-none flex items-center justify-center h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-foreground">
                <Sun className={cn("h-3 w-3 transition-transform", theme === "dark" ? "rotate-0 scale-0" : "rotate-90 scale-75 text-white")} />
                <Moon className={cn("h-3 w-3 absolute transition-transform", theme === "light" ? "rotate-0 scale-0" : "rotate-45 scale-75")} />
            </Switch.Thumb>
        </Switch.Root>
    )
}
