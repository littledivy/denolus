import { parse } from "../src/parser/index.ts";
import { compile } from "../src/compiler/index.ts";

/*pug

  div(class="test")
    span
      | hello Word got to be red
    span
      | text got to be blue
    span( id="denolus")
      | text got to be green
      span#sub
        | text has to be bold

*/
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