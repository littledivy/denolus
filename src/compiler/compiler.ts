// TODO: better type checks

export function Compiler(json: any): string {
  const selectors = Object.keys(json);
  return selectors.map((selector: any) => {
    const definition = json[selector];
    const rules = Object.keys(definition);
    const result = rules.map((rule) => {
      return `${rule}:${definition[rule]}`;
    }).join(";");
    return `${selector}{${result}}`;
  }).join("\n");
}
