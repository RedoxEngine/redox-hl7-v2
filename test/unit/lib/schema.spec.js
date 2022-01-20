const schema = require('../../../schema');

describe('schema', function () {
  for (const messageName of Object.keys(schema.messages)) {
    it(`message definition ${messageName} contains no groups with distinct positional occurrences of the same segment that are not disambiguated`, function () {
      const messageDef = schema.messages[messageName];
      for (const groupName of Object.keys(messageDef)) {
        const jsonKeysUsed = new Set();
        for (const element of messageDef[groupName].elements) {
          const jsonKey = element.jsonKey || element.group || element.segment;
          if (jsonKey === undefined) {
            // These message definitions seem incomplete...
            console.warn(`Found an element in group ${groupName} where the json key was undefined in ${messageName}`);
            continue;
          }
          if (jsonKeysUsed.has(jsonKey)) {
            throw Error(`Re-used json key ${jsonKey} within the same group ${groupName} in message ${messageName}`);
          }
          jsonKeysUsed.add(jsonKey);
        }
      }
    });
  }
});
