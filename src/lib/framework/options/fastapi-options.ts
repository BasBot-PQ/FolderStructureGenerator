import type { FileItem } from "@/types/index"
import type { FrameworkOptionsMap } from "./nextjs-options"

/**
 * Apply FastAPI options to the structure
 */
export const applyFastAPIOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    const appFolder = structure.children?.find((child) => child.name === "app")
    if (appFolder) {
        if (!options["Include app folder"]) {
            structure.children = structure.children?.filter((child) => child.name !== "app")
        } else {
            if (!options["Include api folder"]) {
                appFolder.children = appFolder.children?.filter((child) => child.name !== "api")
            }
            if (!options["Include models folder"]) {
                appFolder.children = appFolder.children?.filter((child) => child.name !== "models")
            }
            if (!options["Include schemas folder"]) {
                appFolder.children = appFolder.children?.filter((child) => child.name !== "schemas")
            }
            if (!options["Include core folder"]) {
                appFolder.children = appFolder.children?.filter((child) => child.name !== "core")
            }
            if (!options["Include crud folder"]) {
                appFolder.children = appFolder.children?.filter((child) => child.name !== "crud")
            }
            if (!options["Include db folder"]) {
                appFolder.children = appFolder.children?.filter((child) => child.name !== "db")
            }
            if (!options["Include tests folder"]) {
                appFolder.children = appFolder.children?.filter((child) => child.name !== "tests")
            }
        }
    }

    // Handle Docker setup
    if (!options["Include Docker setup"]) {
        structure.children = structure.children?.filter(
            (child) => !["Dockerfile", "docker-compose.yml", "entrypoint.sh"].includes(child.name)
        )
    }

    // Handle Alembic migrations
    if (!options["Include alembic migrations"]) {
        structure.children = structure.children?.filter((child) => child.name !== "alembic")
    }

    return structure
}

/**
 * Apply FastAPI by Essonna options to the structure
 */
export const applyFastAPIByEssonnaOptions = (
    structure: FileItem,
    options: FrameworkOptionsMap
): FileItem => {
    // Handle root-level folders (Essonna structure has folders at root, not inside app)
    if (!options["Include app folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "routers")
    }
    if (!options["Include schemas folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "schemas")
    }
    if (!options["Include models folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "models")
    }
    if (!options["Include controllers folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "controllers")
    }
    if (!options["Include utils folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "utils")
    }
    if (!options["Include config folder"]) {
        structure.children = structure.children?.filter((child) => child.name !== "config")
    }

    // Handle Docker setup
    if (!options["Include Docker setup"]) {
        structure.children = structure.children?.filter(
            (child) => !["Dockerfile", "docker-compose.yml"].includes(child.name)
        )
    }

    if (!options["Include requirements.txt"]) {
        structure.children = structure.children?.filter((child) => child.name !== "requirements.txt")
    }

    if (!options["Include .env"]) {
        structure.children = structure.children?.filter((child) => child.name !== ".env")
    }

    return structure
}
