/**
 * starts with ~[
 * ends with ~]
 * Accepts only _, lower and upper alphabets
 */
const VARIABLE_REGEX = /~\[[a-zA-Z_]+\]~/gi;

export default VARIABLE_REGEX;
