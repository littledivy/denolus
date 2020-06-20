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
  let lineByLine = str.split("\n");
  for (const i in lineByLine) {
    // @ts-ignore
    if (lineByLine[i].trim().startsWith("@import")) {
      console.log(lineByLine[i]);
      // console.log(lineByLine[i])
      lineByLine.splice(Number(i), 1);
    }
  }
  return lineByLine.join("\n");
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}
var result = arrayRemove(array, 6); // result = [1, 2, 3, 4, 5, 7, 8, 9, 0]

function removeQuotes(str: string) {
  return str.replace(new RegExp('"', "g"), "");
}

function transform(str: string): string {
  let result = str;
  result = transformComments(result);
  getImportList(result);
  result = removeImports(result);
  return result;
}

export default transform;
