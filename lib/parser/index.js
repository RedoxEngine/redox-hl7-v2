var defSchema = require('../../schema');
var defDelimiters = require('../delimiters');
var _ = require('lodash');

/**
 * Creates a new Parser object
 * @param  {Object} overrideSchema A schema object. The passed in overrideSchema will be merged with the default schema.
 *                                 If that is not what you want, you can use the `schem` function below
 * @param  {Object} delimiters     A delimiters object to use instead of the default delimiters
 * @return {Parser}                Returns itself for chaining
 */
var Parser = module.exports = function (overrideSchema, delimiters) {

  this._schema = overrideSchema ? defSchema.overrideSchema(defSchema, overrideSchema) : defSchema;

  this._delimiters = delimiters || defDelimiters;
  return this;
};

Parser.prototype.parse = Parser.prototype.parseMessage = require('./message');
Parser.prototype.parseSegment = require('./segment');
Parser.prototype.parseField= require('./field');

/**
 * Gets or set the schema
 * If schema is passed in and merge is true, the passed in schema will be merged with the default schema
 * If schema is passed in but merge is false, the passed in schema will be used as THE schema
 * If schema is not passed in, the current schema will be returned
 * @param  {Object} schema A schema object
 * @param  {Boolean} merge  Determines whether the passed in schema should be merged with the default schema, or override the default schema entirely
 * @return {Object}        The schema
 */
Parser.prototype.schema = function (schema, merge) {
  if (!schema) {
    return this._schema;
  }

  this._schema = merge ? defSchema.overrideSchema(defSchema, schema) : schema;
  return this._schema;
};
