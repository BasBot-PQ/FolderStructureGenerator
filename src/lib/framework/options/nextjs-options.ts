import type { FileItem } from "@/types/index"

export type FrameworkOptionsMap = Record<string, boolean | string>

/**
 * Apply Next.js specific options to the structure
 */
export const applyNextjsOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    const useTypeScript = options["Would you like to use TypeScript?"] as boolean
    const useESLint = options["Would you like to use ESLint?"] as boolean
    const useTailwind = options["Would you like to use Tailwind CSS?"] as boolean
    const useSrcDirectory = options["Would you like your code inside a `src/` directory?"] as boolean
    const useAppRouter = options["Would you like to use App Router? (recommended)"] as boolean
    const useTurbopack = options["Would you like to use Turbopack for `next dev`?"] as boolean

    // Update project name to reflect configuration
    structure.name = `nextjs-project${useTypeScript ? "-ts" : "-js"}`

    // Handle src directory structure
    if (useSrcDirectory) {
        const appFolder = structure.children?.find((child) => child.name === "app")
        if (appFolder) {
            structure.children = structure.children?.filter((child) => child.name !== "app")
            const srcFolder: FileItem = {
                id: "src-1",
                name: "src",
                type: "folder",
                children: [appFolder],
            }
            structure.children?.unshift(srcFolder)
        }
    }

    // Handle App Router vs Pages Router
    if (!useAppRouter) {
        structure.children = structure.children?.filter(
            (child) => child.name !== "app" && child.name !== "src"
        )

        const pagesFolder: FileItem = {
            id: "pages-1",
            name: "pages",
            type: "folder",
            children: [
                { id: "index-page-1", name: useTypeScript ? "index.tsx" : "index.js", type: "file" },
                {
                    id: "api-folder-1",
                    name: "api",
                    type: "folder",
                    children: [{ id: "hello-api-1", name: useTypeScript ? "hello.ts" : "hello.js", type: "file" }],
                },
            ],
        }

        if (useSrcDirectory) {
            const srcFolder: FileItem = {
                id: "src-1",
                name: "src",
                type: "folder",
                children: [pagesFolder],
            }
            structure.children?.unshift(srcFolder)
        } else {
            structure.children?.unshift(pagesFolder)
        }
    }

    // Handle TypeScript configuration
    if (!useTypeScript) {
        structure.children = structure.children?.filter((child) => child.name !== "tsconfig.json")

        const updateExtensions = (item: FileItem): void => {
            if (item.type === "file") {
                if (item.name.endsWith(".tsx")) {
                    item.name = item.name.replace(".tsx", ".jsx")
                } else if (item.name.endsWith(".ts")) {
                    item.name = item.name.replace(".ts", ".js")
                }
            }
            if (item.children) {
                item.children.forEach(updateExtensions)
            }
        }
        updateExtensions(structure)
    }

    // Handle ESLint
    if (useESLint) {
        structure.children?.push({
            id: "eslint-config-1",
            name: ".eslintrc.json",
            type: "file",
        })
    }

    // Handle Tailwind CSS
    if (!useTailwind) {
        structure.children = structure.children?.filter((child) => child.name !== "tailwind.config.ts")

        const findAndUpdateGlobalsCss = (item: FileItem): void => {
            if (item.children) {
                item.children = item.children.filter((child) => child.name !== "globals.css")
                item.children.forEach(findAndUpdateGlobalsCss)
            }
        }
        findAndUpdateGlobalsCss(structure)
    } else {
        const tailwindConfig = structure.children?.find((child) => child.name.startsWith("tailwind.config"))
        if (tailwindConfig) {
            tailwindConfig.name = useTypeScript ? "tailwind.config.ts" : "tailwind.config.js"
        }
    }

    // Handle Turbopack
    if (useTurbopack) {
        structure.children?.push({
            id: "turbo-note-1",
            name: "README-turbopack.md",
            type: "file",
        })
    }

    // Update next.config file extension
    const nextConfig = structure.children?.find((child) => child.name.startsWith("next.config"))
    if (nextConfig) {
        nextConfig.name = useTypeScript ? "next.config.ts" : "next.config.js"
    }

    return structure
}
