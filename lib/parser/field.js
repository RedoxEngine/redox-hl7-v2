/**
 * Parses an individual field in an hl7 v2 message
 *
 * @param  {String} fieldValue
 * @param  {String} fieldName
 * @param  {Object} [delimiters] Optional object specifying different delimiters than the defaults
 * @return {JSON/String}            Either JSON or String. JSON if field has components, string otherwise.
 */
module.exports = function (fieldValue, fieldName, delimiters) {
  var ret = {}, dataTypeDef, componentDef, compArray, subCompArray, schema;

  var self = this;

  schema = self._schema;

  delimiters = delimiters || self._delimiters;

  dataTypeDef = schema.dataTypes[schema.fields[fieldName].dataType];

  // Simple String field
  if (dataTypeDef.dataType === 'STRING' || dataTypeDef.dataType === 'VARIES') {
    return fieldValue;
  }

  // Field has components
  compArray = fieldValue.split(delimiters.component);

  for (var i = 0; i < dataTypeDef.components.length; i++) {

    componentDef = schema.dataTypes[schema.dataTypes[dataTypeDef.components[i].dataType].dataType];

    if (compArray[i] === undefined) { continue; }

    // Simple string component
    if (componentDef.dataType === 'STRING') {
      // We add 1 to i since HL7 is not zero based
      ret[i + 1] = compArray[i];
      continue;
    }

    // Field has sub components
    subCompArray = compArray[i].split(delimiters.subComponent);
    // We add 1 to i since HL7 is not zero based
    ret[i + 1] = {};
    for (var j = 0; j < componentDef.components.length; j++) {
      // We add 1 to i and j since HL7 is not zero based
      ret[i + 1][j + 1] = subCompArray[j];
    }
  }

  return ret;
};
