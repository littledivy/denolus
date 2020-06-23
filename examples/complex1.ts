import { parse } from "../src/parser/index.ts";
import { compile } from "../src/compiler/index.ts";

const obj = parse(`
$variable: #ff000
div:
  span:
    ~ fdsqfdsq:
      color: #ff000

    ~ dsqfdsq:
      color: #0000ff

    ~#denolus:
      color: #00ff00
      grid-template:
        - "a a"
        - "b b"
        - "c c"
      ~ #sub:
        font-weight: bold
        color: $variable

`)
const css = compile(obj);

console.log(css);