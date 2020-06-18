import { parse as parseYML } from "./_denolus/parse.ts";
import transformer from './transformer.ts';

export function parse(code: string) {
  return parseYML(transformer(code));
}
