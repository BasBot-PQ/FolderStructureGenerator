"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code, Loader2 } from "lucide-react"
import { toast } from "sonner"

import type { FrameworkStructureProps } from "@/types/index"
import { frameworks } from "@/constants/frameworks"
import {
    getFrameworkStructure,
    applyFrameworkOptions,
    DEFAULT_FRAMEWORK_OPTIONS,
    resetToDefaults as getResetOptions,
    type FrameworkOptions,
} from "@/lib/framework"

import { FrameworkMenuItem } from "./framework-menu-item"
import { FrameworkOptionsDialog } from "./framework-options-dialog"

interface ExtendedFrameworkStructureProps extends FrameworkStructureProps {
    isLoading?: boolean
}

/**
 * Framework selector component with customization options
 * Allows users to select a framework template and customize it
 */
export default function FrameworkSelector({
    onFrameworkSelect,
    selectedFramework,
    isLoading = false,
}: ExtendedFrameworkStructureProps) {
    // State for framework options
    const [frameworkOptions, setFrameworkOptions] = useState<FrameworkOptions>(
        () => JSON.parse(JSON.stringify(DEFAULT_FRAMEWORK_OPTIONS))
    )

    // Mobile detection and dialog state
    const [isMobile, setIsMobile] = useState(false)
    const [selectedFrameworkForOptions, setSelectedFrameworkForOptions] = useState<string | null>(null)
    const [showOptionsDialog, setShowOptionsDialog] = useState(false)

    // Detect mobile screen size
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIsMobile()
        window.addEventListener("resize", checkIsMobile)
        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    // Handle option change for a framework
    const handleOptionChange = useCallback((framework: string, option: string, value: boolean | string) => {
        setFrameworkOptions((prev) => ({
            ...prev,
            [framework]: {
                ...prev[framework],
                [option]: value,
            },
        }))
    }, [])

    // Handle framework selection with applied options
    const handleFrameworkSelect = useCallback((framework: string) => {
        try {
            const baseStructure = getFrameworkStructure(framework)
            const customizedStructure = applyFrameworkOptions(
                baseStructure,
                framework,
                frameworkOptions[framework]
            )

            onFrameworkSelect?.(customizedStructure)
            setShowOptionsDialog(false)
        } catch (error) {
            console.error("Framework selection error:", error)
            toast.error(`Failed to load ${framework} template`)
        }
    }, [frameworkOptions, onFrameworkSelect])

    // Handle mobile framework click (opens dialog)
    const handleMobileFrameworkClick = useCallback((framework: string) => {
        setSelectedFrameworkForOptions(framework)
        setShowOptionsDialog(true)
    }, [])

    // Reset options to defaults for a framework
    const handleResetToDefaults = useCallback((framework: string) => {
        const resetOptions = getResetOptions(framework)
        setFrameworkOptions((prev) => ({
            ...prev,
            [framework]: resetOptions,
        }))
    }, [])

    // Get current options for the selected framework in dialog
    const currentDialogOptions = selectedFrameworkForOptions
        ? frameworkOptions[selectedFrameworkForOptions] || {}
        : {}

    return (
        <div className="w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" disabled={isLoading}>
                        <div className={`flex items-center ${selectedFramework?.framework ? "gap-2" : ""}`}>
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Code className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">
                                {selectedFramework?.framework || ""}
                            </span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64" align="start">
                    <DropdownMenuLabel>Choose Framework Template</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {frameworks.map((framework) => (
                        <FrameworkMenuItem
                            key={framework.name}
                            framework={framework}
                            isMobile={isMobile}
                            options={frameworkOptions[framework.name] || {}}
                            onOptionChange={(option, value) =>
                                handleOptionChange(framework.name, option, value)
                            }
                            onApply={() => handleFrameworkSelect(framework.name)}
                            onReset={() => handleResetToDefaults(framework.name)}
                            onMobileClick={() => handleMobileFrameworkClick(framework.name)}
                            isLoading={isLoading}
                        />
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Options Dialog */}
            <FrameworkOptionsDialog
                open={showOptionsDialog}
                onOpenChange={setShowOptionsDialog}
                framework={selectedFrameworkForOptions}
                options={currentDialogOptions}
                onOptionChange={(option, value) => {
                    if (selectedFrameworkForOptions) {
                        handleOptionChange(selectedFrameworkForOptions, option, value)
                    }
                }}
                onApply={() => {
                    if (selectedFrameworkForOptions) {
                        handleFrameworkSelect(selectedFrameworkForOptions)
                    }
                }}
                onReset={() => {
                    if (selectedFrameworkForOptions) {
                        handleResetToDefaults(selectedFrameworkForOptions)
                    }
                }}
                isLoading={isLoading}
            />
        </div>
    )
}
