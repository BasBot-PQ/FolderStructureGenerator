// Framework templates
export { getFrameworkStructure, getAvailableFrameworks } from "./templates"
export type { FileItem } from "@/types/index"

// Template generators (for direct access)
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
} from "./templates"

// Framework options
export { applyFrameworkOptions, type FrameworkOptionsMap } from "./options"

// Individual option appliers (for direct access)
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
} from "./options"

// Default options configuration
export {
    DEFAULT_FRAMEWORK_OPTIONS,
    getDefaultOptions,
    resetToDefaults,
    type FrameworkOptions,
} from "./default-options"
