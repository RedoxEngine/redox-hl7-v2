global.chai = require('chai');
global.expect = require('chai').expect;
global.sinon = require('sinon');
global.sinonChai = require('sinon-chai');
global.v2 = require('../');
global.escape = require('../lib/escape')

chai.use(sinonChai);
