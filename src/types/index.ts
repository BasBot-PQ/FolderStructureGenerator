import type { LucideIcon } from "lucide-react"

// File Item
export interface FileItem {
    id: string
    name: string
    created_by?: string
    type: "file" | "folder"
    children?: FileItem[]
    comment?: string
    dateCreated?: Date
    dateModified?: Date
    size?: number
    isManuallyOrdered?: boolean // True if children were manually reordered via drag & drop
}

// Clipboard Item
export interface ClipboardItem {
    items: FileItem[]
    operation: "copy" | "cut"
    timestamp: number
}

// Framework Structure
export interface FrameworkStructureProps {
    onFrameworkSelect?: (structure: FileItem) => void
    selectedFramework?: {
        framework: string
    } | null
    isLoading?: boolean
}

// File Icon
export interface FileIcon {
    icon: LucideIcon
    color: string
}

// Base Dialog Props
export interface BaseDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Clear Dialog Props
export interface DialogProps extends BaseDialogProps {
    onClear?: () => void
    onExport?: (format: "json" | "text" | "tree" | "zip" | "directory") => void
}

// Export Dialog Props
export interface ExportDialogProps extends BaseDialogProps {
    onExport?: (format: "json" | "text" | "tree" | "zip" | "directory") => void
}

// Structure Preview Dialog
export interface StructurePreviewDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onFormatSelect: (format: "text" | "tree") => void
    currentFormat: "text" | "tree"
}