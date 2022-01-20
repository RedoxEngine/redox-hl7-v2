/**
 * Packs up a json object representation of HL7 into an actual HL7 message
 * @param  {JSON} json    The JSON version of the HL7 message
 * @return {String}         The HL7 message
 */
module.exports = function writeMessage (json, delimiters) {
  var messageType, eventType, messageEventKey;
  var ret, messageDef;

  var self = this;
  var schema = self._schema;

  delimiters = delimiters || self._delimiters;

  messageType = json.MSH[9][1];

  if (messageType === 'ACK') {
    eventType = 'ACK';
  } else {
    eventType = json.MSH[9][2];
  }

  messageEventKey = schema.structure[messageType][eventType];

  if (!messageEventKey) {
    throw new Error('Could not load the HL7 message structure for an HL7 message.');
  }

  messageDef = schema.messages[messageEventKey];

  var writeGroup = function (groupJSON, messageDef, groupName) {
    var ret = '', element, i, j;

    for ( i = 0; i < messageDef[groupName].elements.length; i++) {

      element = messageDef[groupName].elements[i];

      if (element.segment) {
        const jsonKey = element.jsonKey || element.segment
        if (groupJSON[jsonKey]) {

          if (groupJSON[jsonKey] instanceof Array) {
            const limit = parseInt(element.maxOccurs) === 1 ? 1 : groupJSON[jsonKey].length;
            for ( j = 0; j < limit; j++) {
              ret += self.writeSegment(groupJSON[jsonKey][j], element.segment, delimiters);
              ret += '\r';
            }
          } else {
            ret += self.writeSegment(groupJSON[jsonKey], element.segment, delimiters);
          }
        } else if (parseInt(element.minOccurs) > 0) {
          throw new Error('Message is missing required segment ' + element.segment);
        }
      } else {
        if (groupJSON[element.group]) {

          if (groupJSON[element.group] instanceof Array) {
            const limit = parseInt(element.maxOccurs) === 1 ? 1 : groupJSON[element.group].length;
            for ( j = 0; j < limit; j++) {
              ret += writeGroup(groupJSON[element.group][j], messageDef, element.group);
            }
          } else {
            ret += writeGroup(groupJSON[element.group], messageDef, element.group);
          }
        } else if (parseInt(element.minOccurs) > 0) {
          throw new Error('Message is missing required group ' + element.group);
        }
      }

      ret += '\r';
    }

    return ret;
  };

  ret = writeGroup(json, messageDef, messageEventKey);

  if (ret instanceof Error) {
    return ret;
  }

  ret = ret.replace(/(\r)+/g, '\r'); // Remove excess line breaks

  return ret;
};
