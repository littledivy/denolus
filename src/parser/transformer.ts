function transformComments(str: string): string {
  let result = str;
  const tokens = ['/*', '*/'];
  while (result.indexOf(tokens[0]) > -1 && result.indexOf(tokens[1]) > -1) {
    const exp = result.split(tokens[0])[1];
    let comment = `${tokens[0]}${exp.split(tokens[1])[0]}${
      tokens[1]
      }`;
    // erase the comment and the tokens
    result = result.replace(comment, '');
  }
  return result;
}
function transform(str: string): string {
  let result = str;
  result = transformComments(result);
  return result;
};
export default transform;