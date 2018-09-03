var delimiters = require('./delimiters');
var escape = module.exports = {};

/**
 * The hl7v2 escape characters
 */
escape.field = '\\F\\', // \F\ 
  escape.component = '\\S\\', // \S\
  escape.repetition = '\\R\\', // \R\
  escape.escape = '\\E\\', // \E\
  escape.subComponent = '\\T\\', // \T\

  /**
   * @param  {} delimiters - the delimeters used by the string
   * @param  {} string - the string to escape
   */
  escape.escapeString = function (delimiters, string) {
    return string ? string.toString()
      .split(delimiters.escape).join(escape.escape) //replace the escape character first - we don't want to replace them in any other escape sequences
      .split(delimiters.field).join(escape.field)
      .split(delimiters.component).join(escape.component)
      .split(delimiters.repetition).join(escape.repetition)
      .split(delimiters.subComponent).join(escape.subComponent)
      : string;
  };

/**
 * @param  {} delimiters - the delimeters used by the string
 * @param  {} string - the string to unescape
 */
escape.unEscapeString = function (delimiters, string) {
  return string ? string.toString()
    .split(escape.field).join(delimiters.field)
    .split(escape.component).join(delimiters.component)
    .split(escape.repetition).join(delimiters.repetition)
    .split(escape.subComponent).join(delimiters.subComponent)
    .split(escape.escape).join(delimiters.escape) //replace the escape character last, so that we don't get any false positives
    : string;
};