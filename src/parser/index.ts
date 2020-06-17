import { parse } from '../../deps.ts';

export function parseDenolus(code: string) {
  return JSON.parse(parse(code));
}
