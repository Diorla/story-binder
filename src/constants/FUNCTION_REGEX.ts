/**
 * Regex explained
 ** /~[a-zA-Z_]+ => starts with ~ followed by at least 1 letter or _
 ** \([a-zA-Z[\],=\s\d]*\) => any letter or number or [] or inside (). This is not ideal because it doesn't enforce the structure of a=b
 ** (\[[a-zA-Z_]+\])? => it may contain one or more letters inside [] or none at all
 ** Note \s? is just that there could be at least one space between
 */

const FUNCTION_REGEX =
  /~[a-zA-Z_]+\s?\([a-zA-Z[\],=\s\d]*\)\s?(\[[a-zA-Z_]+\])?~/gi;

export default FUNCTION_REGEX;
