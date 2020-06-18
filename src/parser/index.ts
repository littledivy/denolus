import { parse as parseYML } from "./_denolus/main.ts";

export function parse(code: string) {
  return parseYML(code);
}
