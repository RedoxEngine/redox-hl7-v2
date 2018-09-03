/**
 * Parses an individual segment in an hl7 v2 message
 * @param  {String} segmentValue
 * @param  {String} segmentName
 * @param  {Object} [delimiters]   Optional non default delimiters
 * @return {JSON}              JSON version of the segment
 */
module.exports = function (segmentValue, segmentName, delimiters) {
  var ret = {}, segmentDef, fieldArray, fieldValue, fields;

  var self = this;

  var schema = self._schema;

  delimiters = delimiters || self._delimiters;

  segmentDef = schema.segments[segmentName];
  fieldArray = segmentValue.split(delimiters.field);

  if (segmentName === 'MSH') {
    fieldArray.splice(1, 0, delimiters.field);
  }

  for (var i = 0; i < segmentDef.fields.length; i++) {
    fieldValue = fieldArray[i + 1];

    if (!fieldValue) { continue; }

    if (segmentDef.fields[i].maxOccurs !== '1') {
      ret[i + 1] = [];

      fields = fieldValue.split(delimiters.repetition);

      for (var j = 0; j < fields.length; j++ ) {
        ret[i + 1][j] = self.parseField(fields[j], segmentDef.fields[i].field, delimiters);
      }

    } else {
      // We add 1 to i since HL7 is not zero based
      ret[i + 1] = self.parseField(fieldValue, segmentDef.fields[i].field, delimiters);
    }
  }

  return ret;
};
