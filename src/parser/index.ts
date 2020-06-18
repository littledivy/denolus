import { parse as parseYML } from "../../deps.ts";
import transformer from './transformer.ts';

export function parse(code: string) {
  console.warn(transformer(code))
  return parseYML(transformer(code));
}
