"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import { ScrollArea } from "@base-ui/react/scroll-area";

import type { SortedResult } from "fumadocs-core/search";
import { useDocsSearch } from "fumadocs-core/search/client";
import { staticClient } from "fumadocs-core/search/client/orama-static";

import { SearchIcon } from "lucide-react";

import Link from "next/link";

import { useCallback } from "react";

const client = staticClient();

export function Command() {
  const { setSearch, query } = useDocsSearch({
    client,
  });

  const handleSearch = useCallback(
    (value?: string) => setSearch(value ?? String()),
    [setSearch]
  );

  const rawItems = Array.isArray(query.data) ? query.data : [];

  const groupedData = rawItems.reduce(
    (acc, item) => {
      const [baseUrl] = item.url.split("#");

      if (!acc[baseUrl]) {
        acc[baseUrl] = {
          breadcrumbs: item.breadcrumbs,
          items: [],
          url: baseUrl,
        };
      }

      if (!acc[baseUrl].breadcrumbs && item.breadcrumbs) {
        acc[baseUrl].breadcrumbs = item.breadcrumbs;
      }

      acc[baseUrl].items.push(item);
      return acc;
    },
    {} as Record<
      string,
      { url: string; breadcrumbs?: string[]; items: SortedResult[] }
    >
  );

  const groups = Object.values(groupedData);

  return (
    <Dialog.Root>
      <Dialog.Trigger>Open Command</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/50 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />

        <Dialog.Viewport className="fixed inset-0 flex h-fit flex-start justify-center overflow-hidden px-4 py-32">
          <Dialog.Popup className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 transition-all data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0">
            <Autocomplete.Root
              filter={null}
              items={groups}
              keepHighlight
              onValueChange={handleSearch}
            >
              <Autocomplete.InputGroup className="flex h-14 cursor-text items-center gap-2 border-neutral-200 border-b px-3">
                <SearchIcon className="size-5 text-neutral-500" />
                <Autocomplete.Input
                  className="h-full w-full text-lg text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
                  placeholder="Search"
                />
              </Autocomplete.InputGroup>

              <ScrollArea.Root>
                <ScrollArea.Viewport className="h-full max-h-96 scroll-p-1 overscroll-contain">
                  <ScrollArea.Content className="min-w-full data-has-overflow-y:pr-2">
                    <Autocomplete.Empty
                      className="flex h-48 flex-col items-center justify-center gap-3 px-3"
                      hidden={groups.length > 0}
                    >
                      <p className="text-neutral-700">No results found.</p>
                    </Autocomplete.Empty>
                    <Autocomplete.List
                      className="flex flex-col gap-3 p-1"
                      hidden={groups.length === 0}
                    >
                      {(group) => (
                        <Autocomplete.Group
                          className="flex flex-col gap-1"
                          items={group.items}
                          key={group.url}
                        >
                          {group.breadcrumbs &&
                            group.breadcrumbs.length > 0 && (
                              <Autocomplete.GroupLabel className="pl-2 font-medium text-neutral-500 text-xs">
                                {group.breadcrumbs.slice(-1)}
                              </Autocomplete.GroupLabel>
                            )}

                          <Autocomplete.Collection>
                            {(item: SortedResult) => (
                              <Autocomplete.Item
                                className="rounded-lg px-2 py-2.5 text-neutral-700 transition-colors hover:bg-neutral-200 data-highlighted:bg-neutral-200"
                                key={item.id}
                                render={<Link href={item.url} />}
                                value={item.id}
                              >
                                <Content>{item.content}</Content>
                              </Autocomplete.Item>
                            )}
                          </Autocomplete.Collection>
                        </Autocomplete.Group>
                      )}
                    </Autocomplete.List>
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="pointer-events-none relative m-1 flex w-1 justify-center">
                  <ScrollArea.Thumb className="w-full rounded-full bg-neutral-200" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>

              <div className="flex h-14 items-center border-neutral-200 border-t px-3 text-neutral-700">
                <p>
                  Press{" "}
                  <Dialog.Close
                    className="cursor-pointer rounded-lg bg-neutral-200 px-2 py-0.5 font-medium text-neutral-950 text-sm"
                    nativeButton={false}
                    render={<kbd />}
                  >
                    ESC
                  </Dialog.Close>{" "}
                  to close the search command.
                </p>
              </div>
            </Autocomplete.Root>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  let count = 0;

  return (
    <>
      {children
        ?.toString()
        .split(/<\/?mark>/g)
        .map((part, index) => {
          if (index % 2 === 1) {
            count += 1;
            return (
              <mark
                className="bg-transparent text-neutral-950 underline decoration-2 underline-offset-2"
                key={count}
              >
                {part}
              </mark>
            );
          }
          return part;
        })}
    </>
  );
}
