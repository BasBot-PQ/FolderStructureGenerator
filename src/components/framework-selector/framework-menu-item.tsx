"use client"

import {
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Code, Settings } from "lucide-react"
import { FrameworkOptionsContent } from "./framework-options-content"

interface FrameworkMenuItemProps {
    framework: {
        name: string
        icon?: React.ReactNode
    }
    isMobile: boolean
    options: Record<string, boolean | string>
    onOptionChange: (option: string, value: boolean | string) => void
    onApply: () => void
    onReset: () => void
    onMobileClick: () => void
    isLoading?: boolean
}

/**
 * Individual framework menu item - renders differently for mobile vs desktop
 */
export function FrameworkMenuItem({
    framework,
    isMobile,
    options,
    onOptionChange,
    onApply,
    onReset,
    onMobileClick,
    isLoading = false,
}: FrameworkMenuItemProps) {
    if (isMobile) {
        // Mobile: Simple menu item that opens dialog
        return (
            <DropdownMenuItem
                onClick={onMobileClick}
                className="cursor-pointer flex items-center gap-2"
                disabled={isLoading}
            >
                <Code className="h-4 w-4" />
                <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {framework.name}
                </span>
                <Settings className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
        )
    }

    // Desktop: Submenu with options
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger
                className="cursor-pointer flex items-center gap-2"
                disabled={isLoading}
            >
                <Code className="h-4 w-4" />
                <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {framework.name}
                </span>
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent className="w-96 max-h-96 overflow-hidden">
                <DropdownMenuLabel className="text-sm font-medium">
                    {framework.name} Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <ScrollArea className="h-full">
                    <div className="p-3 max-h-80">
                        <FrameworkOptionsContent
                            framework={framework.name}
                            options={options}
                            onOptionChange={onOptionChange}
                            onApply={onApply}
                            onReset={onReset}
                            isLoading={isLoading}
                        />
                    </div>
                </ScrollArea>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}
