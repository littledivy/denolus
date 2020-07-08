type TokenItem = {
  type: 'selector' | 'property' | 'rule' | 'type' | 'variable',
  name: string,
  value?: string,
  id: string,
  parentId: string | null,
};
/* Recursive function to read the json, and save it into a Map
*/
function recursiveCompilation(json: { [k: string]: any }, collection: Map<string, TokenItem>, opts?: any): void {
  if (!collection) return;
  const { level = 0 } = opts;
  const isTopLevel = level === 0;
  const tokens: string[] = Object.keys(json);
  tokens.forEach((key: string) => {
    switch (true) {
      case Array.isArray(json[key]) && !key.startsWith('_'):
        const arrayId = 'a' + Math.random(); // TODO: use uuid module
        collection.set(arrayId, {
          type: 'rule',
          value: json[key].filter((s: any) => typeof s === 'string').join(' '),
          name: key,
          id: arrayId,
          parentId: opts.id || null,
        });
        break;
      case key.startsWith('$') && isTopLevel && typeof json[key] !== 'object' && json[key].startsWith('='):
        const varId = 'a' + Math.random(); // TODO: use uuid module
        collection.set(varId, {
          type: 'variable',
          value: json[key].substring(1).trim(),
          name: key,
          id: varId,
          parentId: opts.id || null,
        });
        break;
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
      case !Array.isArray(json[key]) && typeof json[key] === 'object':
        const id2 = 'a' + Math.random(); // TODO: use uuid module
        collection.set(id2, {
          type: 'selector',
          value: json[key],
          name: key,
          id: id2, // TODO: use uuid module
          parentId: opts.id || null,
        });
        recursiveCompilation(json[key], collection, {
          level: level + 1,
          id: id2,
        });
    }
  });
}
// TODO: better type checks
export function Compiler(json: any): string {
  let result = '';
  const collection: Map<string, TokenItem> = new Map()
  recursiveCompilation(json, collection, {
    level: 0,
  });
  const entries = Array.from(collection.entries());
  const selectors: TokenItem[] = entries.filter(([, token]) => {
    return token.type === 'selector'
  }).map(([, t]) => t);
  const rules: TokenItem[] = entries.filter(([, token]) => {
    return token.type === 'rule'
  }).map(([, t]) => t);
  const variables: TokenItem[] = entries.filter(([, token]) => {
    return token.type === 'variable'
  }).map(([, t]) => t);
  selectors.forEach((token: TokenItem) => {
    const childRules: string[] = [];
    let query = token.name;
    if (token.parentId) {
      let parent = collection.get(token.parentId);
      while (parent) {
        query = query.replace(/\~/gi, parent.name)
        if (parent.parentId) {
          parent = collection.get(parent.parentId);
        } else {
          parent = undefined;
        }
      }
    }
    let rule = rules.find((r) => r.parentId === token.id);
    while (rule) {
      childRules.push(`${rule.name}: ${rule.value}`);
      rules.splice(rules.indexOf(rule), 1);
      rule = rules.find((r) => r.parentId === token.id);
    }
    if (childRules.length) {
      result += `${query} { ${childRules.join(';\n')} }\n`
    }
  })
  let variable = variables.find((v) => result.indexOf(v.name) > -1);
  while (variable) {
    result = result.replace(variable.name, variable.value as string);
    variable = variables.find((v) => result.indexOf(v.name) > -1);
  }
  return result;
}
