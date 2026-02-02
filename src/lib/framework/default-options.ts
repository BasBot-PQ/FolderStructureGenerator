// Default options for each framework
export interface FrameworkOptions {
    [key: string]: {
        [option: string]: boolean | string
    }
}

export const DEFAULT_FRAMEWORK_OPTIONS: FrameworkOptions = {
    "Next.js": {
        "Would you like to use TypeScript?": true,
        "Would you like to use ESLint?": true,
        "Would you like to use Tailwind CSS?": true,
        "Would you like your code inside a `src/` directory?": false,
        "Would you like to use App Router? (recommended)": true,
        "Would you like to use Turbopack for `next dev`?": false,
    },
    React: {
        "Include components folder": true,
        "Include hooks folder": true,
        "Include utils folder": true,
        "Include TypeScript config": true,
        "Include Vite config": true,
        "Include public folder": true,
    },
    "Vue.js": {
        "Include components folder": true,
        "Include views folder": true,
        "Include composables folder": true,
        "Include TypeScript config": true,
        "Include Vite config": true,
        "Include public folder": true,
    },
    Angular: {
        "Include app module": true,
        "Include components": true,
        "Include services folder": true,
        "Include TypeScript config": true,
        "Include Angular config": true,
        "Include assets folder": true,
    },
    Svelte: {
        "Include lib folder": true,
        "Include routes folder": true,
        "Include components": true,
        "Include TypeScript config": true,
        "Include Svelte config": true,
        "Include Vite config": true,
    },
    "Nuxt.js": {
        "Include pages folder": true,
        "Include components folder": true,
        "Include layouts folder": true,
        "Include TypeScript config": true,
        "Include Nuxt config": true,
        "Include public folder": true,
    },
    Remix: {
        "Include routes folder": true,
        "Include components": true,
        "Include utils folder": true,
        "Include TypeScript config": true,
        "Include Remix config": true,
        "Include public folder": true,
    },
    Astro: {
        "Include pages folder": true,
        "Include components folder": true,
        "Include layouts folder": true,
        "Include TypeScript config": true,
        "Include Astro config": true,
        "Include public folder": true,
    },
    FastAPI: {
        "Include app folder": true,
        "Include api folder": true,
        "Include models folder": true,
        "Include schemas folder": true,
        "Include core folder": true,
        "Include crud folder": true,
        "Include db folder": true,
        "Include tests folder": true,
        "Include Docker setup": true,
        "Include alembic migrations": true,
    },
    "FastAPI by Essonna": {
        "Include app folder": true,
        "Include models folder": true,
        "Include schemas folder": true,
        "Include controllers folder": true,
        "Include utils folder": true,
        "Include config folder": true,
        "Include Docker setup": true,
        "Include requirements.txt": true,
        "Include .env": true,
    },
}

/**
 * Get default options for a specific framework
 */
export const getDefaultOptions = (framework: string): Record<string, boolean | string> => {
    return { ...DEFAULT_FRAMEWORK_OPTIONS[framework] }
}

/**
 * Reset options to default values for a framework
 */
export const resetToDefaults = (framework: string): Record<string, boolean | string> => {
    const defaultOptions = { ...DEFAULT_FRAMEWORK_OPTIONS[framework] }

    if (framework === "Next.js") {
        defaultOptions["Would you like to use TypeScript?"] = true
        defaultOptions["Would you like to use ESLint?"] = true
        defaultOptions["Would you like to use Tailwind CSS?"] = true
        defaultOptions["Would you like your code inside a `src/` directory?"] = false
        defaultOptions["Would you like to use App Router? (recommended)"] = true
        defaultOptions["Would you like to use Turbopack for `next dev`?"] = false
    } else {
        // For other frameworks, set all boolean values to true
        Object.keys(defaultOptions).forEach((key) => {
            if (typeof defaultOptions[key] === "boolean") {
                defaultOptions[key] = true
            }
        })
    }

    return defaultOptions
}
