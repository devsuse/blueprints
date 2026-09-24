import { icons } from "lucide-react";
import { createElement } from "react";

/**
 * Resolve an icon from lucide-react by name.
 * @param name The name of the icon to resolve.
 * @returns The icon component or null if not found.
 */
export function resolveIcon(name?: string | null) {
  if (!(name && name in icons)) {
    return null;
  }
  return createElement(icons[name as keyof typeof icons]);
}
