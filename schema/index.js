var _ = require('lodash');

var schema = module.exports = {
  dataTypes: require('./dataTypes'),
  fields: require('./fields'),
  messages: require('./messages'),
  segments: require('./segments'),
  structure: require('./structure/index.json'),

  overrideSchema: function(base, override){
    return _.mergeWith({}, base, override, function (a, b) {
      // The default behavior for lodash _.merge and arrays is to take all of b,
      // then append anything in a with a higher index than b.length.
      // This means we can never override a with a shorter array.
      // Therefore, we're going for all or nothing. If you override an array, you have to override the entire thing
      if (_.isArray(b)) {
        return b;
      }
    });
  }
};
