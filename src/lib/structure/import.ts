import type { FileItem } from "@/types/index"

/**
 * Parse and validate imported JSON structure
 */
export const importStructure = (content: string): FileItem => {
    try {
        const parsed = JSON.parse(content)
        if (!parsed.id || !parsed.name || !parsed.type) {
            throw new Error("Missing required fields")
        }
        return parsed as FileItem
    } catch {
        throw new Error("Failed to parse imported structure")
    }
}
