import compile from "../src/compiler/index.ts";

const css = compile({
  "div": {
    "color": "#fff",
  },
});

console.log(css);
