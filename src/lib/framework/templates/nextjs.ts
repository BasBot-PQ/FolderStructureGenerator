import type { FileItem } from "@/types/index"

export const createNextjsStructure = (): FileItem => ({
    id: "root",
    name: "nextjs-project",
    type: "folder",
    children: [
        {
            id: "app-1",
            name: "app",
            type: "folder",
            children: [
                { id: "page-1", name: "page.tsx", type: "file" },
                { id: "layout-1", name: "layout.tsx", type: "file" },
                { id: "globals-1", name: "globals.css", type: "file" },
                {
                    id: "api-1",
                    name: "api",
                    type: "folder",
                    children: [
                        {
                            id: "hello-1",
                            name: "hello",
                            type: "folder",
                            children: [{ id: "route-1", name: "route.ts", type: "file" }],
                        },
                    ],
                },
            ],
        },
        {
            id: "components-1",
            name: "components",
            type: "folder",
            children: [
                {
                    id: "ui-1",
                    name: "ui",
                    type: "folder",
                    children: [],
                },
            ],
        },
        {
            id: "lib-1",
            name: "lib",
            type: "folder",
            children: [{ id: "utils-1", name: "utils.ts", type: "file" }],
        },
        {
            id: "public-1",
            name: "public",
            type: "folder",
            children: [],
        },
        { id: "package-1", name: "package.json", type: "file" },
        { id: "next-config-1", name: "next.config.js", type: "file" },
        { id: "tailwind-config-1", name: "tailwind.config.ts", type: "file" },
        { id: "tsconfig-1", name: "tsconfig.json", type: "file" },
    ],
})
