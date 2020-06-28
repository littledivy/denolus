import { parse } from "../src/parser/index.ts";
import { compile as compiler } from "../src/compiler/index.ts";

export function compile(code: string) {
  return compile(parse(code));
}
