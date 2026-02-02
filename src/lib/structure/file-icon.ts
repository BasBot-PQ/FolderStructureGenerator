import { FILE_ICONS } from "@/constants/file-icons"
import { File } from "lucide-react"
import type { FileIcon } from "@/types/index"

/**
 * Get the appropriate icon and color for a file based on its name/extension
 */
export const getFileIcon = (filename: string): FileIcon => {
    const lowerFilename = filename.toLowerCase()
    if (FILE_ICONS[lowerFilename]) return FILE_ICONS[lowerFilename]

    const extension = lowerFilename.split(".").pop()
    return extension && FILE_ICONS[extension] ? FILE_ICONS[extension] : { icon: File, color: "text-gray-500" }
}

/**
 * Format file size in human-readable format (B, KB, MB, GB, TB)
 */
export const formatFileSize = (bytes: number): string => {
    if (!bytes) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
