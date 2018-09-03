/**
 * Packs up a segment into the appropriate HL7 version of it
 * @param  {Object} segmentValue The json version of the segment
 * @param  {String} segmentName  The name of the segment ot pack up
 * @param  {Object} schema       The schema defining how to pack up the schema
 * @param  {Object} delimiters   The delimiters used by this message
 * @return {String}              The string version of the segment
 */
module.exports = function writeSegment (segmentValue, segmentName, delimiters) {
  var ret = '', segmentDef, fieldValue, fields, startIndex;

  var self = this;
  var schema = self._schema;

  delimiters = delimiters || self._delimiters;

  segmentDef = schema.segments[segmentName];

  ret = segmentName;

  if (segmentName === 'MSH') {
    startIndex = 2;
    ret += delimiters.field + delimiters.component+delimiters.repetition+delimiters.escape+delimiters.subComponent;
  } else {
    startIndex = 0;
  }

  for (var i = startIndex; i < segmentDef.fields.length; i++) {

    ret += delimiters.field;

    // We add 1 to i since HL7 is not zero based
    if (!segmentValue[i + 1]) {
      continue;
    }

    if (segmentDef.fields[i].maxOccurs !== '1') {

      fields = segmentValue[i + 1];

      for (var j = 0; j < fields.length; j++ ) {
        fieldValue = fields[j];
        if (j > 0) {
          ret += delimiters.repetition;
        }

        ret += self.writeField(fieldValue, segmentDef.fields[i].field, delimiters);
      }

    } else {
      fieldValue = segmentValue[i + 1];
      ret += self.writeField(fieldValue, segmentDef.fields[i].field, delimiters);
    }
  }

  return ret;
};
