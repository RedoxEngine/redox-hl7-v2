describe('Function: writeField', function() {

  var ret, field, generator;

  before(function(){
    generator = new v2.Generator();
  });

  it('should handle simple fields like MSH.10', function(){
    ret = generator.writeField('12345', 'MSH.10');
    expect(ret).to.equal('12345');
  });

	it('should handle varies fields like OBX.5', function(){
		field = {
			2: 'PDF',
			3: {
				1: 'FAKE COMPONENT'
			},
			4: {
				2: 'ANOTHER FAKE COMPONENT'
			},
			5: 'I AM A PDF DOCUMENT'
		};
		ret = generator.writeField(field, 'OBX.5');
		expect(ret).to.equal('^PDF^FAKE COMPONENT^&ANOTHER FAKE COMPONENT^I AM A PDF DOCUMENT');
	});

	it('should handle simple varies fields', function(){
		ret = generator.writeField('VALUE', 'OBX.5');
		expect(ret).to.equal('VALUE');
	});

	it('should handle complex fields like PID.3', function(){
		field = {
			1: 'ID',
			2: 'CHECK DIGIT',
			3: 'CODE',
			4: {
				1: 'namespace',
				2: 'universal',
				3: 'type'
			},
			5: 'typecode',
			6: {
				1: 'namespace',
				3: 'type'
			},
		};
		ret = generator.writeField(field, 'PID.3');
		expect(ret).to.equal('ID^CHECK DIGIT^CODE^namespace&universal&type^typecode^namespace&&type');
	});

	it('should handle a complex field like PID.3 with simple data', function(){
		ret = generator.writeField({1: '12345'}, 'PID.3');
		expect(ret).to.equal('12345');

		field = {
			1: '12345',
			4: {
				1: 'MR'
			}
		};
		ret = generator.writeField(field, 'PID.3');
		expect(ret).to.equal('12345^^^MR');
	});

	it('should handle null values for string fields', function(){
		ret = generator.writeField(null, 'MSH.10');
		expect(ret).to.equal('');
	});

	it('should handle null values for complex fields', function(){
		ret = generator.writeField({1: null}, 'PID.3');
		expect(ret).to.equal('');
	});

	it('should should handle null values for simple varies fields', function(){
		ret = generator.writeField(null, 'OBX.5');
		expect(ret).to.equal('');
	});

	it('should should handle null values for varies fields', function(){
		field = {
			2: 'PDF',
			3: {
				1: null
			},
			4: {
				2: 'ANOTHER FAKE COMPONENT'
			},
			5: null
		};
		ret = generator.writeField(field, 'OBX.5');
		expect(ret).to.equal('^PDF^^&ANOTHER FAKE COMPONENT^');
	});
});
