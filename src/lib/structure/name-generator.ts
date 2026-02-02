import type { FileItem } from "@/types/index"

/**
 * Generate a numbered name to avoid conflicts (e.g., "file (1).txt")
 */
const generateNumberedName = (existingNames: string[], baseName: string): string => {
    const lastDotIndex = baseName.lastIndexOf(".")
    const hasExtension = lastDotIndex > 0 && lastDotIndex < baseName.length - 1

    const nameWithoutExt = hasExtension ? baseName.slice(0, lastDotIndex) : baseName
    const extension = hasExtension ? baseName.slice(lastDotIndex) : ""

    let counter = 1
    let uniqueName: string

    do {
        uniqueName = `${nameWithoutExt} (${counter})${extension}`
        counter++
    } while (existingNames.includes(uniqueName.toLowerCase()))

    return uniqueName
}

/**
 * Generate a unique name for a new item being added to a folder
 */
export const generateUniqueNameForNewItem = (existingItems: FileItem[], baseName: string): string => {
    const existingNames = existingItems.map((item) => item.name.toLowerCase())
    if (!existingNames.includes(baseName.toLowerCase())) return baseName
    return generateNumberedName(existingNames, baseName)
}

/**
 * Generate a unique name considering move operations within the same parent
 */
export const generateUniqueName = (
    existingItems: FileItem[],
    baseName: string,
    originalName?: string,
    isMovingToSameParent = false,
): string => {
    if (isMovingToSameParent && originalName === baseName) return baseName

    const existingNames = existingItems.map((item) => item.name.toLowerCase())
    if (!existingNames.includes(baseName.toLowerCase())) return baseName

    return generateNumberedName(existingNames, baseName)
}
