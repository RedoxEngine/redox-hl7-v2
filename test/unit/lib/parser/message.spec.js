describe('Function: parse', function () {
  var hl7, msh, unpackedJSON, ret;

  before(function(){
    parser = new v2.Parser();
  });

  beforeEach(function(){
    msh = 'MSH|^~\\&|REMR|RHS||MED2000|200803060953||SIU^S12|20080306953450|P|2.3||||||||\r';

    hl7 = msh + 'SCH|||\rPID|||\rPV1|||\rRGS|||\rRGS|||\r';

    sinon.stub(parser, 'parseSegment').returns({});
  });

  afterEach(function(){
    parser.parseSegment.restore();
  });

  it('should handle char(10), char(13) and char(10) and char(13)', function(){
    var replaced;
    replaced = hl7.replace(/\r/g, '\n');

    ret = parser.parse(replaced);
    expect(ret instanceof Error).to.be.false;

    replaced = hl7.replace(/\r/g, '\r\n');

    ret = parser.parse(replaced);
    expect(ret instanceof Error).to.be.false;
  });

  it('should return null and throw an error if we fail to read MSH', function(){
    hl7 = 'adsf';
    var fn = function () {
      parser.parse(hl7);
    };
    expect(fn).to.throw(/Could not read MSH segment of HL7 v2 message./);
  });

  it('should create a key for simple segments', function(){
    ret = parser.parse(hl7);
    expect(ret).to.contain.keys('MSH', 'SCH');
    expect(ret).not.to.contain.keys('PID', 'PV1');
  });

  it('should create group keys for groups', function(){
    ret = parser.parse(hl7);
    expect(ret).to.contain.keys('PATIENT', 'RESOURCES');
  });

  it('should handle repeating segments', function(){
    hl7 = msh + 'SCH|||\rNTE|||\rNTE|||\rPID|||\rPV1|||\rRGS|||\r';
    ret = parser.parse(hl7);
    expect(ret).to.contain.key('NTE');
    expect(ret.NTE instanceof Array).to.be.true;
  });

  it('should handle repeating segments in groups', function(){
    hl7 = msh + 'SCH|||\rPID|||\rPV1|||\rDG1|||\rDG1|||\rRGS|||\rRGS|||\r';
    ret = parser.parse(hl7);
    expect(ret.PATIENT[0]).to.contain.key('DG1');
    expect(ret.PATIENT[0].DG1 instanceof Array).to.be.true;
  });

  it('should handle repeating groups', function(){
    ret = parser.parse(hl7);
    expect(ret.PATIENT instanceof Array).to.be.true;
    expect(ret.PATIENT.length).to.equal(1);
    expect(ret.RESOURCES.length).to.equal(2);
    expect(ret.RESOURCES[0]).to.contain.key('RGS');
    expect(ret.RESOURCES[1]).to.contain.key('RGS');
  });

  it('should throw an error if a required segment is missing', function(){
    hl7 = msh + 'PID|||\rPV1|||\rRGS|||\r';
    var fn = function () {
      parser.parse(hl7);
    };
    expect(fn).to.throw(/Message is missing required segment SCH./);
  });

  it('should throw an error if a required group is missing', function(){
    hl7 = msh + 'SCH|||\rPID|||\rPV1|||\r';
    var fn = function () {
      parser.parse(hl7);
    };
    expect(fn).to.throw(/Message is missing required group RESOURCES./);
  });

  it('should skip segments that are not in the definition', function(){
    hl7 = msh + 'SCH|||\rNOT|||\rNTE|||\rNTE|||\rPID|||\rPV1|||\rRGS|||\r';
    ret = parser.parse(hl7);
    expect(ret).not.to.contain.key('NOT');
  });

  it('should handle char(10), char(13) and char(10) and char(13)', function(){
    var replaced;
    replaced = hl7.replace(/\r/g, '\n');

    ret = parser.parse(replaced);
    expect(ret).to.contain.keys('MSH', 'SCH', 'PATIENT', 'RESOURCES');

    replaced = hl7.replace(/\r/g, '\r\n');

    ret = parser.parse(replaced);
    expect(ret).to.contain.keys('MSH', 'SCH', 'PATIENT', 'RESOURCES');
  });

  it('should handle groups with choice segments', function(){
    /*
      Technically, the SchemaParser treats xsd:choice elements just like a bunch of optional elements
      so there should not really be a difference here, but testing just for sanity
     */
    msh = 'MSH|^~\\&|REMR|RHS||MED2000|200803060953||ORM^O01|20080306953450|P|2.3||||||||\r';
    hl7 = msh + 'PID|||\rPV1|||\rIN1|||\rIN1|||\rGT1|||\rORC|||\rOBR|||\rDG1|||\rOBX|||\rOBX|||\rOBX|||\r';

    ret = parser.parse(hl7);
    expect(ret.ORDER[0].ORDER_DETAIL.OBRRQDRQ1RXOODSODT_SUPPGRP).to.contain.key('OBR');

    hl7 = hl7.replace(/OBR/g, 'RQD');
    ret = parser.parse(hl7);
    expect(ret.ORDER[0].ORDER_DETAIL.OBRRQDRQ1RXOODSODT_SUPPGRP).to.contain.key('RQD');

  });

  it('should handle messages with missing optional segments in repeating groups', function(){
    msh = 'MSH|^~\\&|REMR|RHS||MED2000|200803060953||ORU^R01|20080306953450|P|2.3||||||||\r';
    hl7 = msh + 'PID|||\rORC|||\rOBR|||\rOBX|||\r';

    ret = parser.parse(hl7);
    expect(ret.PATIENT_RESULT[0].ORDER_OBSERVATION[0].OBSERVATION.length).to.equal(1);

  });

  it('should handle messages with repeating segments at the end', function(){
    msh = 'MSH|^~\\&|REMR|RHS||MED2000|200803060953||ORM^O01|20080306953450|P|2.3||||||||\r';
    hl7 = msh + 'PID\rNTE\rPV1\rIN1\rIN1\rGT1\rORC\rOBR\rNTE\rDG1\rOBX\rNTE';

    ret = parser.parse(hl7);

    expect(ret.ORDER[0].ORDER_DETAIL.OBSERVATION[0].NTE.length).to.equal(1);

    hl7 = msh + 'PID\rNTE\rPV1\rIN1\rIN1\rGT1\rORC\rOBR\rNTE\rDG1\rOBX\rNTE\rNTE\rOBX\rNTE';

    ret = parser.parse(hl7);

    expect(ret.ORDER[0].ORDER_DETAIL.OBSERVATION[0].NTE.length).to.equal(2);
    expect(ret.ORDER[0].ORDER_DETAIL.OBSERVATION[1].NTE.length).to.equal(1);
  });

  it('should handle ACK messages with no event type', function () {
    hl7 = 'MSH|^~\&|MIRTH||REDOX|RDX|20150915004731||ACK|20150915004731|P|2.3\rMSA|AA|1';

    ret = parser.parse(hl7);

    expect(ret).to.contain.keys('MSH', 'MSA');
  });

  it('should handle ACK messages with an event type', function () {
    hl7 = 'MSH|^~\&|MIRTH||REDOX|RDX|20150915004731||ACK^S12|20150915004731|P|2.3\rMSA|AA|1';

    ret = parser.parse(hl7);

    expect(ret).to.contain.keys('MSH', 'MSA');
  });
});
