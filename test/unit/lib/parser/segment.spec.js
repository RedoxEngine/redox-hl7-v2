describe('Function: parseSegment', function(){

  var segment;

  before(function(){
    parser = new v2.Parser();
  });

  beforeEach(function(){
    sinon.stub(parser, 'parseField');
  });

  afterEach(function(){
    parser.parseField.restore();
  });

  it('should call parseField for each field in the segment', function(){
    segment = 'PID|1||58587^^^ATH~1233982^^^OPT|0|SMITH^MICHAEL^||20080205|F|||176215TH STREET^HOUSTON^TX^77306||(832)795-8259|||S|||999999999||||||||||||';
    parser.parseSegment(segment, 'PID');
    expect(parser.parseField).to.have.been.calledWith('SMITH^MICHAEL^', 'PID.5');
    expect(parser.parseField).to.have.been.calledWith('20080205', 'PID.7');
  });

  it('should handle the MSH segment', function(){
    segment = 'MSH|^~\\&|REMR|1000^RHS||MED2000|200803060953||SIU^S12|20080306953450|P|2.3||||||||';
    parser.parseSegment(segment, 'MSH');
    expect(parser.parseField).to.have.been.calledWith('REMR', 'MSH.3');
    expect(parser.parseField).to.have.been.calledWith('1000^RHS', 'MSH.4');
  });

  it('should handle repeating fields like PID.3', function(){
    segment = 'PID|1||58587^^^ATH~1233982^^^OPT|0|SMITH^MICHAEL^||20080205|F|||176215TH STREET^HOUSTON^TX^77306||(832)795-8259|||S|||999999999||||||||||||';
    parser.parseSegment(segment, 'PID');
    expect(parser.parseField).to.have.been.calledWith('58587^^^ATH', 'PID.3');
    expect(parser.parseField).to.have.been.calledWith('1233982^^^OPT', 'PID.3');
  });

});
