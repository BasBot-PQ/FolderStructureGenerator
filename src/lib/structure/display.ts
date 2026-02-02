import type { FileItem } from "@/types/index"

/**
 * Generate a simple indented text display of the folder structure
 */
export const generateStructureDisplay = (structure: FileItem, indent = ""): string => {
    let result = ""

    if (structure.id === "root") {
        result += `${structure.name}/\n`
    } else {
        result += `${indent}${structure.name}${structure.type === "folder" ? "/" : ""}\n`
    }

    if (structure.type === "folder" && Array.isArray(structure.children)) {
        for (const child of structure.children) {
            result += generateStructureDisplay(child, indent + "  ")
        }
    }

    return result
}

/**
 * Generate a tree-style view with connectors (├─, └─, │)
 */
export const generateTreeView = (structure: FileItem, prefix = "", isLast = true): string => {
    let result = ""

    if (structure.id === "root") {
        result += `${structure.name}/\n`
    } else {
        const connector = isLast ? "└─ " : "├─ "
        const itemName = structure.type === "folder" ? `${structure.name}/` : structure.name
        result += `${prefix}${connector}${itemName}\n`
        prefix += isLast ? "   " : "│  "
    }

    if (structure.type === "folder" && Array.isArray(structure.children)) {
        structure.children.forEach((child, index) => {
            const isLastChild = index === (structure.children?.length || 0) - 1
            result += generateTreeView(child, prefix, isLastChild)
        })
    }

    return result
}
