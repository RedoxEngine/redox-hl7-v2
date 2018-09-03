describe('Function: segment', function() {
  var ret, segment, generator;

	before(function(){
		generator = new v2.Generator();
	});

	beforeEach(function(){
		segment = {
			1: '1',
			3: [{
				1: '58587',
				4: {
					1: 'ATH'
				}
			},{
				1: '1233982',
				4: {
					1: 'OPT'
				}
			}],
			5: [{
				1: {
					1: 'SMITH'
				},
				2: 'MICHAEL'
			}],
			7: {
				1: '20080205',
			},
			8: 'F',
			11: [{
				1: {
					1: '176215TH STREET'
				},
				3: 'HOUSTON',
				5: '77306'
			}],
			13: {
				1: '(832)795-8259'
			}
		};
		sinon.stub(generator, 'writeField');
	});

	afterEach(function(){
		generator.writeField.restore();
	});

	it('should call writeField for each field in the segment', function(){
		generator.writeSegment(segment, 'PID');
		expect(generator.writeField).to.have.been.calledWith({
				1: {
					1: 'SMITH'
				},
				2: 'MICHAEL'
			}, 'PID.5');
		expect(generator.writeField).to.have.been.calledWith({1:'20080205'}, 'PID.7');
		expect(generator.writeField).to.have.been.calledWith('F', 'PID.8');
	});

	it('should handle the MSH segment', function(){
		segment = {
			1: '|',
			2: '^~\\&',
			3: {
				1: 'REMR',
			},
			4: {
				1: '1000',
				2: 'RHS'
			},
			7: {
				1: '200803060953'
			}
		};
		generator.writeSegment(segment, 'MSH');
		expect(generator.writeField).to.have.been.calledWith({1: 'REMR'}, 'MSH.3');
		expect(generator.writeField).to.have.been.calledWith({1: '1000', 2: 'RHS'}, 'MSH.4');
		expect(generator.writeField).not.to.have.been.calledWith('|', 'MSH.1');
		expect(generator.writeField).not.to.have.been.calledWith('^~\\&', 'MSH.2');
	});

	it('should handle repeating fields like PID.3', function(){
		generator.writeSegment(segment, 'PID');
		expect(generator.writeField).to.have.been.calledWith({
			1: '58587',
			4: {
				1: 'ATH'
			}
		}, 'PID.3');
		expect(generator.writeField).to.have.been.calledWith({
			1: '1233982',
			4: {
				1: 'OPT'
			}
		}, 'PID.3');
	});
});
