import type { FileItem } from "@/types/index"

interface Stats {
    folders: number
    files: number
    comments: number
    maxDepth: number
}

function calculateStats(node: FileItem, depth: number = 0, stats?: Stats): Stats {
    if (!stats) {
        stats = { folders: 0, files: 0, comments: 0, maxDepth: 0 }
    }

    if (node.type === "folder") {
        stats.folders++
    } else {
        stats.files++
    }

    if (node.comment) {
        stats.comments++
    }

    stats.maxDepth = Math.max(stats.maxDepth, depth)

    if (node.children) {
        node.children.forEach(child => calculateStats(child, depth + 1, stats))
    }

    return stats
}

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }
    return text.replace(/[&<>"']/g, m => map[m])
}

function renderNode(node: FileItem, depth: number = 0, expandedByDefault: boolean = true): string {
    const hasChildren = node.children && node.children.length > 0
    const isFolder = node.type === "folder"
    const icon = isFolder ? "📁" : "📄"
    const isExpanded = expandedByDefault

    let html = `<div class="tree-node" data-id="${node.id}" data-depth="${depth}">`
    html += `<div class="tree-node-inner" onclick="toggleNode(event, '${node.id}')">`

    if (hasChildren) {
        html += `<div class="expand-icon">${isExpanded ? "▼" : "▶"}</div>`
    } else {
        html += `<div class="expand-icon placeholder"></div>`
    }

    html += `<div class="node-icon">${icon}</div>`
    html += `<div class="node-content">`
    html += `<div class="node-label"><span class="node-name">${escapeHtml(node.name)}</span></div>`

    if (hasChildren) {
        html += `<div class="node-meta">${node.children!.length} item${node.children!.length > 1 ? "s" : ""}</div>`
    }

    if (node.comment) {
        html += `<div class="node-comment">${escapeHtml(node.comment)}</div>`
    }

    html += `</div></div>`

    if (hasChildren) {
        html += `<div class="tree-children ${isExpanded ? "" : "hidden"}">`
        node.children!.forEach(child => {
            html += renderNode(child, depth + 1, expandedByDefault)
        })
        html += `</div>`
    }

    html += `</div>`
    return html
}

export function generateHtmlViewer(data: FileItem): string {
    const stats = calculateStats(data)
    const treeHtml = renderNode(data, 0, true)

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Structure Viewer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #ffffff;
            color: #1a1a1a;
            transition: background 0.3s, color 0.3s;
            padding: 20px;
        }

        body.dark-mode {
            background: #1a1a1a;
            color: #e0e0e0;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }

        body.dark-mode header {
            border-bottom-color: #333;
        }

        h1 {
            font-size: 28px;
            font-weight: 600;
        }

        .controls {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        button {
            padding: 8px 16px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: #f5f5f5;
            color: #1a1a1a;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }

        body.dark-mode button {
            background: #333;
            border-color: #555;
            color: #e0e0e0;
        }

        button:hover {
            background: #e0e0e0;
        }

        body.dark-mode button:hover {
            background: #444;
        }

        button.active {
            background: #4f46e5;
            color: white;
            border-color: #4f46e5;
        }

        .search-box {
            margin-bottom: 20px;
        }

        .search-box input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            background: #f9f9f9;
            color: #1a1a1a;
        }

        body.dark-mode .search-box input {
            background: #2a2a2a;
            border-color: #444;
            color: #e0e0e0;
        }

        .search-box input::placeholder {
            color: #999;
        }

        .tree {
            background: #fafafa;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #e0e0e0;
        }

        body.dark-mode .tree {
            background: #252525;
            border-color: #333;
        }

        .tree-node {
            margin-left: 0;
        }

        .tree-node-inner {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 8px 0;
            cursor: pointer;
            user-select: none;
        }

        .tree-node-inner:hover {
            background: rgba(79, 70, 229, 0.05);
            border-radius: 4px;
            padding: 8px 4px;
        }

        body.dark-mode .tree-node-inner:hover {
            background: rgba(79, 70, 229, 0.15);
        }

        .expand-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            font-size: 12px;
            color: #666;
        }

        body.dark-mode .expand-icon {
            color: #999;
        }

        .expand-icon.placeholder {
            visibility: hidden;
        }

        .node-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 14px;
        }

        .node-content {
            flex: 1;
        }

        .node-name {
            font-weight: 500;
            color: #1a1a1a;
        }

        body.dark-mode .node-name {
            color: #e0e0e0;
        }

        .node-label {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .node-meta {
            font-size: 12px;
            color: #999;
            margin-top: 2px;
        }

        body.dark-mode .node-meta {
            color: #666;
        }

        .node-comment {
            background: #fef3c7;
            border-left: 3px solid #f59e0b;
            padding: 10px 12px;
            border-radius: 4px;
            margin-top: 8px;
            font-size: 13px;
            line-height: 1.4;
            color: #92400e;
        }

        body.dark-mode .node-comment {
            background: rgba(245, 158, 11, 0.15);
            border-left-color: #f59e0b;
            color: #fbbf24;
        }

        .tree-children {
            margin-left: 20px;
            border-left: 1px solid #e0e0e0;
            padding-left: 0;
            margin-top: 4px;
        }

        body.dark-mode .tree-children {
            border-left-color: #444;
        }

        .tree-children.hidden {
            display: none;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 15px;
        }

        body.dark-mode .stat-card {
            background: #252525;
            border-color: #333;
        }

        .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #4f46e5;
        }

        .stat-label {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        body.dark-mode .stat-label {
            color: #666;
        }

        @media (prefers-color-scheme: dark) {
            body {
                background: #1a1a1a;
                color: #e0e0e0;
            }
            body.light-mode {
                background: #ffffff;
                color: #1a1a1a;
            }
        }

        @media print {
            .controls,
            .search-box {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📁 Project Structure</h1>
            <div class="controls">
                <button id="expandAllBtn">Expand All</button>
                <button id="collapseAllBtn">Collapse All</button>
                <button id="themeToggle">🌙 Dark Mode</button>
            </div>
        </header>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-value">${stats.folders}</div>
                <div class="stat-label">Folders</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.files}</div>
                <div class="stat-label">Files</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.comments}</div>
                <div class="stat-label">Comments</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.maxDepth}</div>
                <div class="stat-label">Max Depth</div>
            </div>
        </div>

        <div class="search-box">
            <input type="text" id="searchInput" placeholder="🔍 Search by name or comment...">
        </div>

        <div class="tree" id="tree">${treeHtml}</div>
    </div>

    <script>
        let expandedNodes = new Set(['root']);

        function toggleNode(event, nodeId) {
            event.stopPropagation();
            if (expandedNodes.has(nodeId)) {
                expandedNodes.delete(nodeId);
            } else {
                expandedNodes.add(nodeId);
            }
            render();
        }

        function expandAll() {
            document.querySelectorAll('[data-id]').forEach(node => {
                expandedNodes.add(node.dataset.id);
            });
            render();
        }

        function collapseAll() {
            expandedNodes.clear();
            expandedNodes.add('root');
            render();
        }

        function render() {
            const tree = document.getElementById('tree');
            tree.querySelectorAll('.tree-children').forEach(el => {
                const treeNode = el.previousElementSibling.closest('.tree-node');
                const nodeId = treeNode?.dataset.id;
                if (nodeId) {
                    const isExpanded = expandedNodes.has(nodeId);
                    const icon = treeNode.querySelector('.expand-icon');
                    if (icon) {
                        icon.textContent = isExpanded ? '▼' : '▶';
                    }
                    if (isExpanded) {
                        el.classList.remove('hidden');
                    } else {
                        el.classList.add('hidden');
                    }
                }
            });
        }

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
            document.getElementById('themeToggle').textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
        });

        // Expand/Collapse buttons
        document.getElementById('expandAllBtn').addEventListener('click', expandAll);
        document.getElementById('collapseAllBtn').addEventListener('click', collapseAll);

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.tree-node').forEach(node => {
                if (!searchTerm) {
                    node.style.display = '';
                } else {
                    const text = node.textContent.toLowerCase();
                    node.style.display = text.includes(searchTerm) ? '' : 'none';
                }
            });
        });

        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            document.getElementById('themeToggle').textContent = '☀️ Light Mode';
        }

        // Initial expand all
        expandAll();
    </script>
</body>
</html>`
}