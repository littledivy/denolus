function transformComments(str: string): string {
  let result = str;
  const tokens = ["/*", "*/"];
  while (result.indexOf(tokens[0]) > -1 && result.indexOf(tokens[1]) > -1) {
    const exp = result.split(tokens[0])[1];
    let comment = `${tokens[0]}${exp.split(tokens[1])[0]}${tokens[1]}`;
    // erase the comment and the tokens
    result = result.replace(comment, "");
  }
  return result;
}

function getImportList(str: string): string[] {
  let lineByLine = str.split("\n");
  let fileList: string[] = [];
  for (const i in lineByLine) {
    // @ts-ignore
    if (lineByLine[i].trim().startsWith("@import")) {
      // @ts-ignore
      fileList.push(removeQuotes(lineByLine[i].split("@import")[1].trim()));
    }
  }
  return fileList;
}

function removeImports(str: string): string {
  let lineByLine: string[] = str.split("\n");
  let result = [];
  for (let i = 0; i < lineByLine.length; i++) {
    const element = lineByLine[i];
    if (!element.trim().startsWith("@import")) {
      result.push(element);
    }
  }
  return result.join("\n");
}

function removeItemOnce(arr: string[], value: string) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function removeQuotes(str: string) {
  return str.replace(new RegExp('"', "g"), "");
}

function syncImports(str: string, importList: string[]) {
  let importedStr: string = "";
  for (let i = 0; i < importList.length; i++) {
    importedStr += fetchImport(importList[i]) + "\n";
  }
  return importedStr + str;
}

function fetchImport(file: string): string {
  return Deno.readTextFileSync(file.endsWith(".lus") ? file : file + ".lus");
  // TODO: internal imports
}

function transformVars(str: string): string {
  let result = str;
  const matchs = /(\$)([^\=\s]*)+\s*(\=)([^\n\r]*)+/gi;
  const match = /(\$)([^\=\s]*)+\s*(\=)([^\n\r]*)+/;
  const m = result.match(matchs);
  if (m) {
    m.forEach((s: string) => {
      const newS = s.replace(match, '$1$2: =$4');
      result = result.replace(s, newS);
    });
  }
  return result;
}

function transform(str: string): string {
  let result = str;
  result = transformComments(result);
  let importList = getImportList(result);
  result = removeImports(result);
  result = syncImports(result, importList);
  result = transformVars(result);
  return result;
}

export default transform;
