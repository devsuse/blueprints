// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"components/button.mdx": () => import("../src/content/components/button.mdx?collection=docs"), "components/index.mdx": () => import("../src/content/components/index.mdx?collection=docs"), "index.mdx": () => import("../src/content/index.mdx?collection=docs"), "what-is-blueprints.mdx": () => import("../src/content/what-is-blueprints.mdx?collection=docs"), }),
};
export default browserCollections;