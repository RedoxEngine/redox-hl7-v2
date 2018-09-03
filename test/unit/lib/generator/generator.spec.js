describe('Generator', function() {

  describe('Function: Generator', function () {
    it('should use the default schema', function () {
      var generator = new v2.Generator();
      expect(generator._schema).to.exist;
    });

    it('should use the default delimiters', function () {
      var generator = new v2.Generator();
      expect(generator._delimiters).to.eql(require('../../../../lib/delimiters'));
    });

    it('should accept alternative delimiters', function () {
      var delimiters = {
        field: '*', // |
        component: '(', // ^
        repetition: '%', // ~
        escape: '@', // \
        subComponent: '!' // &
      };
      var generator = new v2.Generator(null, delimiters);
      expect(generator._delimiters).to.eql(delimiters);
    });
  });

  describe('Function: schema', function() {

    it('should set the schema to the passed in schema', function () {
      var newSchema = {
        newStuff: {}
      };
      var generator = new v2.Generator();
      generator.schema(newSchema);
      expect(generator._schema).to.eql(newSchema);
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

      var generator = new v2.Generator();
      generator.schema(schema, true);
      expect(generator._schema.dataTypes.TCTEST.dataType).to.equal('STRING');
      expect(generator._schema.dataTypes.varies.dataType).to.equal('STRING');
      // doesn't change existing key
      expect(generator._schema.dataTypes.ST.dataType).to.equal('STRING');
    });

    it('should get the schema', function () {
      var generator = new v2.Generator();
      var ret = generator.schema();
      expect(ret).to.eql(generator._schema);
    });

  });


});
