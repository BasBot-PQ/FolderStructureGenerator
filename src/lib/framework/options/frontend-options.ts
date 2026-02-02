import type { FileItem } from "@/types/index"
import type { FrameworkOptionsMap } from "./nextjs-options"

/**
 * Apply React options to the structure
 */
export const applyReactOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    const srcFolder = structure.children?.find((child) => child.name === "src")
    if (srcFolder) {
        if (!options["Include components folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "components")
        }
        if (!options["Include hooks folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "hooks")
        }
        if (!options["Include utils folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "utils")
        }
    }

    if (!options["Include TypeScript config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "tsconfig.json")
    }
    if (!options["Include Vite config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "vite.config.ts")
    }
    if (!options["Include public folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "public")
    }

    return structure
}

/**
 * Apply Vue.js options to the structure
 */
export const applyVueOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    const srcFolder = structure.children?.find((child) => child.name === "src")
    if (srcFolder) {
        if (!options["Include components folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "components")
        }
        if (!options["Include views folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "views")
        }
        if (!options["Include composables folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "composables")
        }
    }

    if (!options["Include TypeScript config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "tsconfig.json")
    }
    if (!options["Include Vite config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "vite.config.ts")
    }
    if (!options["Include public folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "public")
    }

    return structure
}

/**
 * Apply Angular options to the structure
 */
export const applyAngularOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    const srcFolder = structure.children?.find((child) => child.name === "src")
    if (srcFolder) {
        const appFolder = srcFolder.children?.find((child) => child.name === "app")
        if (appFolder && !options["Include app module"]) {
            appFolder.children = appFolder.children?.filter((child) => child.name !== "app.module.ts")
        }
        if (appFolder && !options["Include components"]) {
            appFolder.children = appFolder.children?.filter((child) => !child.name.includes("component"))
        }
        if (!options["Include services folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "services")
        }
        if (!options["Include assets folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "assets")
        }
    }

    if (!options["Include TypeScript config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "tsconfig.json")
    }
    if (!options["Include Angular config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "angular.json")
    }

    return structure
}

/**
 * Apply Svelte options to the structure
 */
export const applySvelteOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    const srcFolder = structure.children?.find((child) => child.name === "src")
    if (srcFolder) {
        if (!options["Include lib folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "lib")
        }
        if (!options["Include routes folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "routes")
        }
        if (!options["Include components"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "components")
        }
    }

    if (!options["Include TypeScript config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "tsconfig.json")
    }
    if (!options["Include Svelte config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "svelte.config.js")
    }
    if (!options["Include Vite config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "vite.config.js")
    }

    return structure
}

/**
 * Apply Nuxt.js options to the structure
 */
export const applyNuxtOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    if (!options["Include pages folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "pages")
    }
    if (!options["Include components folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "components")
    }
    if (!options["Include layouts folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "layouts")
    }
    if (!options["Include TypeScript config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "tsconfig.json")
    }
    if (!options["Include Nuxt config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "nuxt.config.ts")
    }
    if (!options["Include public folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "public")
    }

    return structure
}

/**
 * Apply Remix options to the structure
 */
export const applyRemixOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    const appFolder = structure.children?.find((child) => child.name === "app")
    if (appFolder) {
        if (!options["Include routes folder"]) {
            appFolder.children = appFolder.children?.filter((child) => child.name !== "routes")
        }
        if (!options["Include components"]) {
            appFolder.children = appFolder.children?.filter((child) => child.name !== "components")
        }
        if (!options["Include utils folder"]) {
            appFolder.children = appFolder.children?.filter((child) => child.name !== "utils")
        }
    }

    if (!options["Include TypeScript config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "tsconfig.json")
    }
    if (!options["Include Remix config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "remix.config.js")
    }
    if (!options["Include public folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "public")
    }

    return structure
}

/**
 * Apply Astro options to the structure
 */
export const applyAstroOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    const srcFolder = structure.children?.find((child) => child.name === "src")
    if (srcFolder) {
        if (!options["Include pages folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "pages")
        }
        if (!options["Include components folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "components")
        }
        if (!options["Include layouts folder"]) {
            srcFolder.children = srcFolder.children?.filter((child) => child.name !== "layouts")
        }
    }

    if (!options["Include TypeScript config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "tsconfig.json")
    }
    if (!options["Include Astro config"]) {
        structure.children = structure.children?.filter((child) => child.name !== "astro.config.mjs")
    }
    if (!options["Include public folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "public")
    }

    return structure
}
