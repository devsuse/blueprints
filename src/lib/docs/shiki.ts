import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import shell from "shiki/langs/shell.mjs";
import typescript from "shiki/langs/typescript.mjs";
import tsx from "shiki/langs/tsx.mjs";

import githubLight from "shiki/themes/github-light.mjs";
import githubDark from "shiki/themes/github-dark.mjs";

export const shiki = createHighlighterCoreSync({
  themes: [githubDark, githubLight],
  langs: [shell, typescript, tsx],
  engine: createJavaScriptRegexEngine(),
});
