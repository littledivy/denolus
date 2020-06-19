import { parse } from "../src/parser/index.ts";
import { compile } from "../src/compiler/index.ts";

const obj = parse(`
div:
  color: #fff
  background: deepskyblue
  font-weight: 10px
`)

const css = compile(obj);

console.log(css);
