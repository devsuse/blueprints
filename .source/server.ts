// @ts-nocheck
import * as __fd_glob_5 from "../src/content/what-is-blueprints.mdx?collection=docs"
import * as __fd_glob_4 from "../src/content/index.mdx?collection=docs"
import * as __fd_glob_3 from "../src/content/components/index.mdx?collection=docs"
import * as __fd_glob_2 from "../src/content/components/button.mdx?collection=docs"
import { default as __fd_glob_1 } from "../src/content/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../src/content/components/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.docs("docs", "src/content", {"components/meta.json": __fd_glob_0, "meta.json": __fd_glob_1, }, {"components/button.mdx": __fd_glob_2, "components/index.mdx": __fd_glob_3, "index.mdx": __fd_glob_4, "what-is-blueprints.mdx": __fd_glob_5, });