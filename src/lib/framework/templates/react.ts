import type { FileItem } from "@/types/index"

export const createReactStructure = (): FileItem => ({
    id: "root",
    name: "react-project",
    type: "folder",
    children: [
        {
            id: "src-1",
            name: "src",
            type: "folder",
            children: [
                { id: "app-1", name: "App.tsx", type: "file" },
                { id: "main-1", name: "main.tsx", type: "file" },
                { id: "index-css-1", name: "index.css", type: "file" },
                {
                    id: "components-1",
                    name: "components",
                    type: "folder",
                    children: [],
                },
                {
                    id: "hooks-1",
                    name: "hooks",
                    type: "folder",
                    children: [],
                },
                {
                    id: "utils-1",
                    name: "utils",
                    type: "folder",
                    children: [],
                },
            ],
        },
        {
            id: "public-1",
            name: "public",
            type: "folder",
            children: [
                { id: "vite-svg-1", name: "vite.svg", type: "file" },
                { id: "index-html-1", name: "index.html", type: "file" },
            ],
        },
        { id: "package-1", name: "package.json", type: "file" },
        { id: "vite-config-1", name: "vite.config.ts", type: "file" },
        { id: "tsconfig-1", name: "tsconfig.json", type: "file" },
    ],
})
