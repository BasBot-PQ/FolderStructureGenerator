import type { FileItem } from "@/types/index"

// Initial Structure
export const INITIAL_STRUCTURE = (): FileItem => ({
    id: "root",
    name: "project",
    type: "folder",
    children: [
        {
            id: "README.md",
            name: "README.md",
            type: "file",
            comment: `## ✨ Features

- 🌳 Visual Structure
- 🎯 Drag-and-Drop
- 🔄 Undo/Redo
- ⌨️ Keyboard Shortcuts
- 📦 Batch Actions
- ✏️ Rename
- 💬 Comments
- 🧠 Smart Nesting
- 📋 Clipboard Operations
- 📤 Export Options
- 📥 Import Structures
- 🌓 Theme Support
- 💾 Auto-Save
- 🔄 Live Preview
- 🎁 Templates
- 📱 Responsive Design`,
            dateCreated: new Date(),
            dateModified: new Date(),
            size: 100,
        },
    ],
})
