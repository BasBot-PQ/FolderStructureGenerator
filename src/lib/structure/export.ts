import type { FileItem } from "@/types/index"
import { downloadAsZip, downloadAsDirectory } from "@/utils/zip-exporter"
import { generateStructureDisplay, generateTreeView } from "./display"

/**
 * Find a selected folder in the structure tree
 */
const findSelectedFolder = (structure: FileItem, selectedItems: string[]): FileItem | null => {
    if (selectedItems.includes(structure.id) && structure.type === 'folder') {
        return {
            ...structure,
            children: structure.children || []
        }
    }

    if (structure.type === 'folder' && structure.children) {
        for (const child of structure.children) {
            const found = findSelectedFolder(child, selectedItems)
            if (found) return found
        }
    }

    return null
}

export type ExportFormat = "json" | "text" | "tree" | "zip" | "directory"

/**
 * Export the folder structure in various formats
 */
export const exportStructure = (
    structure: FileItem,
    format: ExportFormat,
    selectedItems: string[] = []
): void => {
    try {
        if (format === "zip") {
            downloadAsZip([structure], "project-structure.zip")
            return
        }

        if (format === "directory") {
            const selectedFolder = findSelectedFolder(structure, selectedItems)
            if (!selectedFolder) {
                console.error("No folder selected")
                return
            }
            downloadAsDirectory(selectedFolder, selectedFolder.name)
            return
        }

        let content = ""
        let filename = ""
        let mimeType = "text/plain"

        switch (format) {
            case "json":
                content = JSON.stringify(structure, null, 2)
                filename = "project-structure.json"
                mimeType = "application/json"
                break
            case "tree":
                content = generateTreeView(structure)
                filename = "project-structure-tree.txt"
                break
            case "text":
                content = generateStructureDisplay(structure)
                filename = "project-structure.txt"
                break
        }

        const blob = new Blob([content], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    } catch (err) {
        console.error("Export failed:", err)
    }
}
