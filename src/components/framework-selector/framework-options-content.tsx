"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface FrameworkOptionsContentProps {
    framework: string
    options: Record<string, boolean | string>
    onOptionChange: (option: string, value: boolean | string) => void
    onApply: () => void
    onReset: () => void
    isLoading?: boolean
}

/**
 * Reusable component for rendering framework options
 * Used in both desktop submenu and mobile dialog
 */
export function FrameworkOptionsContent({
    framework,
    options,
    onOptionChange,
    onApply,
    onReset,
    isLoading = false,
}: FrameworkOptionsContentProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-3">
                {Object.entries(options).map(([option, value]) => (
                    <div key={option} className="flex items-center space-x-3">
                        <Checkbox
                            id={`${framework}-${option}`}
                            checked={value as boolean}
                            onCheckedChange={(checkedState) => onOptionChange(option, checkedState as boolean)}
                            className="h-4 w-4"
                        />
                        <label
                            htmlFor={`${framework}-${option}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2 border-t">
                <Button onClick={onApply} disabled={isLoading}>
                    Apply Template
                </Button>

                <Button onClick={onReset} variant="outline" disabled={isLoading}>
                    Reset to Defaults
                </Button>
            </div>
        </div>
    )
}
