// source.config.ts
import { defineDocs } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "src/content",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true
    }
  }
});
export {
  docs
};
