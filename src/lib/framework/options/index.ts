import type { FileItem } from "@/types/index"

// Re-export type
export type { FrameworkOptionsMap } from "./nextjs-options"

// Import all option appliers
import { applyNextjsOptions, type FrameworkOptionsMap } from "./nextjs-options"
import {
    applyReactOptions,
    applyVueOptions,
    applyAngularOptions,
    applySvelteOptions,
    applyNuxtOptions,
    applyRemixOptions,
    applyAstroOptions,
} from "./frontend-options"
import { applyFastAPIOptions, applyFastAPIByEssonnaOptions } from "./fastapi-options"

// Framework options appliers mapping
const FRAMEWORK_OPTIONS_APPLIERS: Record<
    string,
    (structure: FileItem, options: FrameworkOptionsMap) => FileItem
> = {
    "Next.js": applyNextjsOptions,
    React: applyReactOptions,
    "Vue.js": applyVueOptions,
    Angular: applyAngularOptions,
    Svelte: applySvelteOptions,
    "Nuxt.js": applyNuxtOptions,
    Remix: applyRemixOptions,
    Astro: applyAstroOptions,
    FastAPI: applyFastAPIOptions,
    "FastAPI by Essonna": applyFastAPIByEssonnaOptions,
}

/**
 * Apply framework-specific options to customize the structure
 */
export const applyFrameworkOptions = (
    structure: FileItem,
    framework: string,
    options: FrameworkOptionsMap
): FileItem => {
    // Clone the structure to avoid mutations
    const customStructure = JSON.parse(JSON.stringify(structure)) as FileItem

    const applier = FRAMEWORK_OPTIONS_APPLIERS[framework]
    if (applier) {
        return applier(customStructure, options)
    }

    return customStructure
}

// Re-export individual appliers for direct access if needed
export {
    applyNextjsOptions,
    applyReactOptions,
    applyVueOptions,
    applyAngularOptions,
    applySvelteOptions,
    applyNuxtOptions,
    applyRemixOptions,
    applyAstroOptions,
    applyFastAPIOptions,
    applyFastAPIByEssonnaOptions,
}
