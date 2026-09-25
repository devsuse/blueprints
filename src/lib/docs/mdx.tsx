import type { MDXComponents } from "mdx/types";

import {CodeBlock, CodeBlockTab, CodeBlockTabs, CodeBlockTabsList, CodeBlockTabsTrigger} from "@/components/docs/ui/codeblock";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    CodeBlock,
    CodeBlockTab,
    CodeBlockTabs,
    CodeBlockTabsList,
    CodeBlockTabsTrigger,
    ...components,
  };
}
