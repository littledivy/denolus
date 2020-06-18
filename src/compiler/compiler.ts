type TokenItem = {
  type: 'selector' | 'property' | 'rule' | 'type',
  name: string,
  value?: string,
  id: string,
  parentId: string | null,
};
/* Recursive function to read the json, and save it into a Map
*/
function recursiveCompilation(json: { [k: string]: any }, collection?: Map<string, TokenItem>, opts?: any): void {
  if (!collection) return;
  const { level = 0 } = opts;
  const isTopLevel = level === 0;
  const tokens: string[] = Object.keys(json);
  const id = 'a' + Math.random(); // TODO: use uuid module
  let parentId = null;
  tokens.forEach((key: string) => {
    switch (true) {
      case typeof json[key] === 'string':
        const ruleId = 'a' + Math.random(); // TODO: use uuid module
        collection.set(ruleId, {
          type: 'rule',
          value: json[key],
          name: key,
          id: ruleId,
          parentId: opts.id || null,
        });
        break;
      case typeof json[key] === 'object':
        collection.set(id, {
          type: 'selector',
          value: json[key],
          name: key,
          id, // TODO: use uuid module
          parentId: opts.id || null,
        });
        recursiveCompilation(json[key], collection, {
          level: level + 1,
          id,
        });
    }
  });
}
// TODO: better type checks
export function Compiler(json: any): string {
  const collection = new Map()
  recursiveCompilation(json, collection, {
    level: 0,
  });
  console.warn(collection, json);
  const selectors = Object.keys(json)
  return selectors.map((selector: any) => {
    const definition = json[selector];
    const rules = Object.keys(definition);
    const result = rules.map((rule) => {
      return `${rule}:${definition[rule]}`;
    }).join(";");
    return `${selector}{${result}}`;
  }).join("\n");
}
