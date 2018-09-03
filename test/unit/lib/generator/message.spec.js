describe('Function: writeMessage', function() {
  var ret, json, generator;

  before(function () {
    generator = new v2.Generator();
  });

  beforeEach(function(){
    json = {
      "MSH": {
        "9": {
          "1": "SIU",
          "2": "S12"
        }
      },
      "SCH": {},
      "PATIENT": [
        {
          "PID": {},
          "PV1": {},
          "DG1": [
            {1: '1'},
            {1: '2'}
          ]
        }
      ],
      "RESOURCES": [
        {
          "RGS": {},
          "SERVICE": [

          ],
          "GENERAL_RESOURCE": [

          ],
          "LOCATION_RESOURCE": [
            {
              "AIL": {},
              "NTE": [
                {1: '1'},
                {2: '2'}
              ]
            }
          ],
          "PERSONNEL_RESOURCE": [
            {
              "AIP": {}
            }
          ]
        }
      ]
    };

    sinon.stub(generator, 'writeSegment', function (segmentValue, segmentName) {
      return segmentName;
    });

  });

  afterEach(function(){
    generator.writeSegment.restore();
  });

  it('should call writeSegment for each segment in the definition', function(){
    ret = generator.writeMessage(json);
    expect(generator.writeSegment).to.have.been.calledWith(json.MSH, 'MSH');
    expect(generator.writeSegment).to.have.been.calledWith(json.SCH, 'SCH');
    expect(generator.writeSegment).to.have.been.calledWith(json.PATIENT[0].PID, 'PID');
    expect(generator.writeSegment).to.have.been.calledWith(json.PATIENT[0].DG1[0], 'DG1');
    expect(generator.writeSegment).to.have.been.calledWith(json.PATIENT[0].DG1[1], 'DG1');
    expect(generator.writeSegment).to.have.been.calledWith(json.RESOURCES[0].LOCATION_RESOURCE[0].NTE[0], 'NTE');
    expect(generator.writeSegment).to.have.been.calledWith(json.RESOURCES[0].LOCATION_RESOURCE[0].NTE[1], 'NTE');
  });

  it('should handle repeating optional segments (NTE)', function(){
    json = {
      "MSH":{
        "9": {
          "1": "ORM",
          "2": "O01"
        }
      },
      "PATIENT":{
        "PID":{},
        "NTE":[
           {"1":1,"3":[]},
           {"1":2,"3":[]},
           {"1":3,"3":[]}
        ],
        "PATIENT_VISIT":{
           "PV1":{ }
        },
        "INSURANCE":[
           {
              "IN1":{}
           },
        ],
        "GT1":{}
     },
     "ORDER":[
        {
           "ORC":{},
           "ORDER_DETAIL":{
              "OBRRQDRQ1RXOODSODT_SUPPGRP":{
                 "OBR":{}
              },
              "NTE":[
                 {"1":1, "3":[]},
                 {"1":2, "3":[]},
                 {"1":3, "3":[]}
              ],
              "DG1":[{}],
              "OBSERVATION":[
                 {
                    "OBX":{},
                    "NTE":[
                       { "1":1, "3":[]},
                       { "1":2, "3":[]},
                       { "1":3, "3":[]},
                    ]
                 },
              ]
           }
        }
      ]
    };

    ret = generator.writeMessage(json);
    expect(ret).to.equal('MSH\rPID\rNTE\rNTE\rNTE\rPV1\rIN1\rGT1\rORC\rOBR\rNTE\rNTE\rNTE\rDG1\rOBX\rNTE\rNTE\rNTE\r');
  });

  it('should throw an error if a required segment is missing', function(){
    delete json.SCH;
    var fn = function () {
      generator.writeMessage(json);
    };
    expect(fn).to.throw(/Message is missing required segment SCH/);
  });

  it('should throw an error if a required group is missing', function(){
    delete json.RESOURCES;

    var fn = function () {
      generator.writeMessage(json);
    };
    expect(fn).to.throw(/Message is missing required group RESOURCES/);
  });

  it('should handle ACK messages', function () {
    var ackJSON = {
      "MSH": {
        "0": "MSH",
        "1": "|",
        "2": "^~\\&",
        "3": {
          "1": "MIRTH"
        },
        "5": {
          "1": "REDOX"
        },
        "6": {
          "1": "RDX"
        },
        "7": {
          "1": "20150915004731"
        },
        "9": {
          "1": "ACK",
          "2": "S12"
        },
        "10": "20150915004731",
        "11": {
          "1": "T"
        },
        "12": {
          "1": "2.3"
        }
      },
      "MSA": {
        "0": "MSA",
        "1": "AA",
        "2": "1"
      }
    };
    ret = generator.writeMessage(ackJSON);
    expect(ret).to.equal('MSH\rMSA\r');
  });
});
