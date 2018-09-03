var _ = require('lodash');
var escape = require('../escape');

/**
 * If not an object, just returns fieldValue. If it is an object, it loops over it assuming
 * the top level key is the component number and the second level key is the subcomponent number
 * @param  {String/Object} fieldValue Value of the field
 * @param  {Object} delimiters The delimiters this message uses
 * @return {String}            The field in hl7 format
 */
function writeVariesField(fieldValue, delimiters) {
  var componentCounter = 1, subComponentCounter;
  var ret = '';
  if (!_.isObject(fieldValue)) {
    return escape.escapeString(delimiters, fieldValue);
  }

  for (var key in fieldValue) {
    while (componentCounter < key) {
      ret += delimiters.component;
      componentCounter++;
    }

    if (_.isObject(fieldValue[key])) {
      subComponentCounter = 1;
      for (var sub in fieldValue[key]) {
        while (subComponentCounter < sub) {
          ret += delimiters.subComponent;
          subComponentCounter++;
        }

        ret += escape.escapeString(delimiters, fieldValue[key][sub]) || '';
      }
    } else {
      ret += escape.escapeString(delimiters, fieldValue[key]) || '';
    }
  }
  return ret;
}



/**
 * Packs up an individual field based on the HL7 spec for that field
 * @param  {String/Object} fieldValue The json version of the field
 * @param  {String} fieldName  The name of the field
 * @param  {Object} schema     The schema defining this message
 * @param  {Object} delimiters The delimiters this message uses
 * @return {String}            A string representation of the field
 */
module.exports = function writeField(fieldValue, fieldName, delimiters) {
  var ret = '', dataTypeDef, componentDef;
  var subCompsToAdd, compsToAdd;
  var i, j, k, l;

  var self = this;
  var schema = self._schema;

  delimiters = delimiters || self._delimiters;

  dataTypeDef = schema.dataTypes[schema.fields[fieldName].dataType];

  // Simple String field
  if (dataTypeDef.dataType === 'STRING') {
    return escape.escapeString(delimiters, fieldValue) || '';
  }

  if (dataTypeDef.dataType === 'VARIES') {
    return writeVariesField(fieldValue, delimiters) || '';
  }

  // Field has components
  compsToAdd = -1;
  for (i = 0; i < dataTypeDef.components.length; i++) {

    componentDef = schema.dataTypes[schema.dataTypes[dataTypeDef.components[i].dataType].dataType];

    compsToAdd++;

    if (fieldValue[i + 1] === undefined) {
      continue;
    }

    for (l = 0; l < compsToAdd; l++) {
      ret += delimiters.component;
    }
    compsToAdd = 0;

    // Simple string component
    if (componentDef.dataType === 'STRING') {
      // We add 1 to i since HL7 is not zero based
      ret += escape.escapeString(delimiters, fieldValue[i + 1]) || '';
      continue;
    }

    // Field has sub components

    subCompsToAdd = -1;
    for (j = 0; j < componentDef.components.length; j++) {

      subCompsToAdd++;

      if (fieldValue[i + 1][j + 1] === undefined) {
        continue;
      }

      for (k = 0; k < subCompsToAdd; k++) {
        ret += delimiters.subComponent;
      }
      subCompsToAdd = 0;

      // We add 1 to i  and jsince HL7 is not zero based
      ret += escape.escapeString(delimiters, fieldValue[i + 1][j + 1]) || '';
    }
  }

  return ret;
};