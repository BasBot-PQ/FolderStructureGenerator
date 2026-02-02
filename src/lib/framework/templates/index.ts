import type { FileItem } from "@/types/index"

// Import all template generators
import { createNextjsStructure } from "./nextjs"
import { createReactStructure } from "./react"
import {
    createVueStructure,
    createAngularStructure,
    createSvelteStructure,
    createNuxtStructure,
    createRemixStructure,
    createAstroStructure,
} from "./frontend-frameworks"
import { createFastAPIStructure, createFastAPIByEssonnaStructure } from "./fastapi"

// Framework generators mapping
const FRAMEWORK_GENERATORS: Record<string, () => FileItem> = {
    "Next.js": createNextjsStructure,
    React: createReactStructure,
    "Vue.js": createVueStructure,
    Angular: createAngularStructure,
    Svelte: createSvelteStructure,
    "Nuxt.js": createNuxtStructure,
    Remix: createRemixStructure,
    Astro: createAstroStructure,
    FastAPI: createFastAPIStructure,
    "FastAPI by Essonna": createFastAPIByEssonnaStructure,
}

/**
 * Get the folder structure template for a given framework
 */
export const getFrameworkStructure = (framework: string): FileItem => {
    const generator = FRAMEWORK_GENERATORS[framework]
    if (!generator) {
        console.error(`Framework "${framework}" not found in generators`)
        throw new Error(`Unsupported framework: ${framework}`)
    }

    return generator()
}

/**
 * Get list of available framework names
 */
export const getAvailableFrameworks = (): string[] => {
    return Object.keys(FRAMEWORK_GENERATORS)
}

// Re-export individual templates for direct access if needed
export {
    createNextjsStructure,
    createReactStructure,
    createVueStructure,
    createAngularStructure,
    createSvelteStructure,
    createNuxtStructure,
    createRemixStructure,
    createAstroStructure,
    createFastAPIStructure,
    createFastAPIByEssonnaStructure,
}
