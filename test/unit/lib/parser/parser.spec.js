describe('Parser', function() {

  describe('Function: Parser', function() {
    it('should use the default schema', function () {
      var parser = new v2.Parser();
      expect(parser._schema).to.exist;
    });

    it('should use the default delimiters', function () {
      var parser = new v2.Parser();
      expect(parser._delimiters).to.eql(require('../../../../lib/delimiters'));
    });

    it('should accept alternative delimiters', function () {
      var delimiters = {
        field: '*', // |
        component: '(', // ^
        repetition: '%', // ~
        escape: '@', // \
        subComponent: '!' // &
      };
      var parser = new v2.Parser(null, delimiters);
      expect(parser._delimiters).to.eql(delimiters);
    });
  });

  describe('Function: schema', function() {

    it('should set the schema to the passed in schema', function () {
      var newSchema = {
        newStuff: {}
      };
      var parser = new v2.Parser();
      parser.schema(newSchema);
      expect(parser._schema).to.eql(newSchema);
    });

    it('should merge the schema if merge is true', function () {
      var schema = {
        dataTypes: {
          'TCTEST': {
            dataType: 'STRING' // no original
          },
          'varies': {
            dataType: 'STRING' // original is varies
          }
        }
      };

      var parser = new v2.Parser();
      parser.schema(schema, true);
      expect(parser._schema.dataTypes.TCTEST.dataType).to.equal('STRING');
      expect(parser._schema.dataTypes.varies.dataType).to.equal('STRING');
      // doesn't change existing key
      expect(parser._schema.dataTypes.ST.dataType).to.equal('STRING');
    });

    it('should get the schema', function () {
      var parser = new v2.Parser();
      var ret = parser.schema();
      expect(ret).to.eql(parser._schema);
    });

  });

});
