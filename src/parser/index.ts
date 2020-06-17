import { parse as parseYML } from "../../deps.ts";

export function parse(code: string) {
  return JSON.parse(parseYML(code));
}
