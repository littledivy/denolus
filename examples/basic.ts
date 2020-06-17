import { compile } from "../src/compiler/index.ts";

const css = compile.of({
  "div": {
    "color": "#fff",
  },
});

console.log(css);
