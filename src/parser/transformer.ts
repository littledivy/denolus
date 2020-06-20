import { readFileStr } from "https://deno.land/std/fs/mod.ts";

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
  const decoder = new TextDecoder("utf-8");
  const text = decoder.decode(
    Deno.readFileSync(file.endsWith(".lus") ? file : file + ".lus"),
  );
  return text;
  // TODO: internal imports
}

function transform(str: string): string {
  let result = str;
  result = transformComments(result);
  let importList = getImportList(result);
  result = removeImports(result);
  result = syncImports(result, importList);
  return result;
}

export default transform;
