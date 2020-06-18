import { parse as parseYML } from "../../deps.ts";
import transformer from './transformer.ts';

export function parse(code: string) {
  return parseYML(transformer(code));
}
