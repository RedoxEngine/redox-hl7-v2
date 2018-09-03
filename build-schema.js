var fs = require('fs');
var async = require('async');
var rootDir = process.cwd() + '/schema';

async.each(['fields', 'segments', 'messages', 'dataTypes'], function (dir, next) {
  var index = 'module.exports = {\n';

  fs.readdir(rootDir + '/' + dir, function (err, files) {

    for (var i = 0; i < files.length; i++) {

      if (files[i].indexOf('.json') < 0) continue;

      index += '  ' + '\'' + files[i].replace('.json', '') + '\': require(\'./' + files[i] + '\'),\n';
    }

    index += '};';

    fs.writeFileSync(rootDir + '/' + dir + '/index.js', index);

  });
});
