"use client";

import { useSyncExternalStore } from "react";

import { Tabs } from "@base-ui/react/tabs";

function extract(value: string): { name: string; key: string } {
  const [name, key] = value.split("::");
  return { name, key };
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener("storage-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("storage-change", callback);
  };
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (<>{children}</>)
}

export function CodeBlockTabs({ ...props }: Tabs.Root.Props) {
  const { key } = extract(props.defaultValue);

  const value = useSyncExternalStore(
      subscribe,
      () => {
        if (typeof window === "undefined" || !key) return props.defaultValue;
        return localStorage.getItem(key) ?? props.defaultValue;
      },
      () => props.defaultValue
    );

  function handleValueChange(value: string) {
    const { name, key } = extract(value);
    localStorage.setItem(key, Array(name, key).join("::"));
    window.dispatchEvent(new Event("storage-change"));
  }

  return (<Tabs.Root value={value} onValueChange={handleValueChange} {...props}>{props.children}</Tabs.Root>)
}

export function CodeBlockTabsList({...props}: Tabs.List.Props) {
  return (<Tabs.List {...props}>{props.children}</Tabs.List>)
}

export function CodeBlockTabsTrigger({ ...props }: Tabs.Tab.Props) {
  const { name } = extract(props.children?.toString() ?? String());

  return (<Tabs.Tab {...props}>{name}</Tabs.Tab>)
}

export function CodeBlockTab({ ...props }: Tabs.Panel.Props) {
  return (<Tabs.Panel {...props}>{props.children}</Tabs.Panel>)
}
