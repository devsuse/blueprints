import type { Folder, Node, Root } from "fumadocs-core/page-tree";
import { findNeighbour } from "fumadocs-core/page-tree";

/**
 * Finds the previous and next nodes in a tree, scoped to the folder that contains the given URL.
 * @param tree The root of the tree to search.
 * @param url The URL of the node to find the neighbours for.
 * @returns An object containing the previous and next nodes, or null if they don't exist.
 */
export function findScopedNeighbour(tree: Root, url: string) {
  const scopedChildren = getScope(tree, url);

  const scopedRoot: Root = {
    children: scopedChildren,
    name: tree.name,
    type: "root",
  };

  return findNeighbour(scopedRoot, url);
}

/**
 * Gets the children of the folder that contains the given URL.
 * @param tree The root of the tree to search.
 * @param url The URL of the node to find the scope for.
 * @returns The children of the folder that contains the given URL, or the root's children if no folder is found.
 */
function getScope(tree: Root, url: string): Node[] {
  for (const node of tree.children) {
    if (node.type === "folder" && isInside(node, url)) {
      return node.children;
    }
  }

  return tree.children.filter((node) => node.type !== "folder");
}

/**
 * Checks if a URL is inside a folder.
 * @param folder The folder to check.
 * @param url The URL to check.
 * @returns True if the URL is inside the folder, false otherwise.
 */
function isInside(folder: Folder, url: string): boolean {
  if (folder.index?.url === url) {
    return true;
  }

  return folder.children.some((child) => {
    if (child.type === "page") {
      return child.url === url;
    }
    if (child.type === "folder") {
      return isInside(child, url);
    }

    return false;
  });
}
