import { parse } from "../src/parser/index.ts";
import { compile } from "../src/compiler/index.ts";

const obj = parse(`
div:
  /* other comment */
  color: #fff /*no more a comment */
  background: deepskyblue /*
  multi line comment
  */
  /*test of comments*/
`)
const css = compile(obj);

console.log(css);