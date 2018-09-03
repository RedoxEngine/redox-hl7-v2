describe('Function: parseField', function(){

  var ret, parser;

  before(function(){
    parser = new v2.Parser();
  });

  it('should handle simple fields like MSH.10', function(){
    ret = parser.parseField(12345, 'MSH.10');
    expect(ret).to.equal('12345');
  });

  it('should handle fields with data type VARIES like OBX.5', function(){
    ret = parser.parseField('1^2&3', 'OBX.5');
    expect(ret).to.equal('1^2&3');
  });

  it('should handle fields with components and sub components like PID.3', function(){
    ret = parser.parseField('ID^CHECK DIGIT^CODE^namespace&universal&type^typecode^namespace&universal&type', 'PID.3');
    expect(ret).to.contain.keys('1', '2', '3', '4', '5', '6');
    expect(ret[1]).to.equal('ID');
    expect(ret[2]).to.equal('CHECK DIGIT');
    expect(ret[3]).to.equal('CODE');
    expect(ret[4]).to.contain.keys('1', '2', '3');
    expect(ret[4][1]).to.equal('namespace');
    expect(ret[4][2]).to.equal('universal');
    expect(ret[4][3]).to.equal('type');
    expect(ret[5]).to.equal('typecode');
    expect(ret[6][1]).to.equal('namespace');
    expect(ret[6][2]).to.equal('universal');
    expect(ret[6][3]).to.equal('type');
  });

  it('should handle a component field like PID.3 with simple data', function(){
    ret = parser.parseField('12345', 'PID.3');
    expect(ret).to.contain.key('1');
    expect(ret[1]).to.equal('12345');

    ret = parser.parseField('12345^^^MR', 'PID.3');
    expect(ret).to.contain.keys('1', '4');
    expect(ret[1]).to.equal('12345');
    expect(ret[4]).to.contain.keys('1');
    expect(ret[4][1]).to.equal('MR');
  });

  it('should handle fields with components and sub components and escape sequences', function(){
    ret = parser.parseField('ID^CHECK DIGIT^CODE\\F\\^n\\F\\amespace&\\F\\universal&type^typecode^namespace&universal&type', 'PID.3');
    expect(ret).to.contain.keys('1', '2', '3', '4', '5', '6');
    expect(ret[1]).to.equal('ID');
    expect(ret[2]).to.equal('CHECK DIGIT');
    expect(ret[3]).to.equal('CODE|');
    expect(ret[4]).to.contain.keys('1', '2', '3');
    expect(ret[4][1]).to.equal('n|amespace');
    expect(ret[4][2]).to.equal('|universal');
    expect(ret[4][3]).to.equal('type');
    expect(ret[5]).to.equal('typecode');
    expect(ret[6][1]).to.equal('namespace');
    expect(ret[6][2]).to.equal('universal');
    expect(ret[6][3]).to.equal('type');
  });
});