var defSchema = require('../../schema');
var defDelimiters = require('../delimiters');
var _ = require('lodash');

var Generator = module.exports = function (overrideSchema, delimiters) {

  this._schema = overrideSchema ? defSchema.overrideSchema(defSchema, overrideSchema) : defSchema;

  this._delimiters = delimiters || defDelimiters;
};

Generator.prototype.write = Generator.prototype.writeMessage = require('./message');
Generator.prototype.writeSegment = require('./segment');
Generator.prototype.writeField= require('./field');

/**
 * Gets or set the schema
 * If schema is passed in and merge is true, the passed in schema will be merged with the default schema
 * If schema is passed in but merge is false, the passed in schema will be used as THE schema
 * If schema is not passed in, the current schema will be returned
 * @param  {Object} schema A schema object
 * @param  {Boolean} merge  Determines whether the passed in schema should be merged with the default schema, or override the default schema entirely
 * @return {Object}        The schema
 */
Generator.prototype.schema = function (schema, merge) {
  if (!schema) {
    return this._schema;
  }

  this._schema = merge ? defSchema.overrideSchema(defSchema, schema) : schema;
  return this._schema;
};