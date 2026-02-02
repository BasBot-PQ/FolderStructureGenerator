"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Code } from "lucide-react"
import { FrameworkOptionsContent } from "./framework-options-content"

interface FrameworkOptionsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    framework: string | null
    options: Record<string, boolean | string>
    onOptionChange: (option: string, value: boolean | string) => void
    onApply: () => void
    onReset: () => void
    isLoading?: boolean
}

/**
 * Mobile-friendly dialog for selecting framework options
 */
export function FrameworkOptionsDialog({
    open,
    onOpenChange,
    framework,
    options,
    onOptionChange,
    onApply,
    onReset,
    isLoading = false,
}: FrameworkOptionsDialogProps) {
    if (!framework) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-lg max-h-[85vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        {framework} Options
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Customize your {framework} template by selecting the options you want to include.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 min-h-0 py-4">
                    <ScrollArea className="h-full pr-4">
                        <FrameworkOptionsContent
                            framework={framework}
                            options={options}
                            onOptionChange={onOptionChange}
                            onApply={onApply}
                            onReset={onReset}
                            isLoading={isLoading}
                        />
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}
