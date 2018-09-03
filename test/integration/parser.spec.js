var _ = require('lodash');

var hl7 = 'MSH|^~\\&|HMS03|NCA|EPIC|NCA|200909261522||DFT^P03|152210|T|2.5|||||||||\r\
EVN|P03|||||200909261607|\r\
PID|||11401562^^^1013^MRN||HALL^MARCUS^A||19341230|F|||1234 Some Street^^Davis^CA^95616||800123456|||||SSC313010|05138985||||||||||||||||||||\r\
PV1|||NW4||||2331^SEEGER, THOMAS^A^^^^^^1003^^^^PRN||||||||||||86210313010|||||||||||||||||||||||||20150501||||||||\r\
FT1|1|691234||20090923^20090923||CG|84460^^PROC|||1|125.10||MED^^SRCA||||||123.12^^I9|2331^SEEGER^THOMAS^A^^^^^NPI^1003^^^^PRN|2335^COOPER^GEORGE^A^^^^^NPI^1003^^^^PRN||1024123||99213^Office Visit^ICD9|MOD1~MOD2|||61519-1234-12-01^NDC Description||\r\
';

var outputJSON = {
  "MSH": {
    "1": "|",
    "2": "^~\\&",
    "3": {
      "1": "HMS03"
    },
    "4": {
      "1": "NCA"
    },
    "5": {
      "1": "EPIC"
    },
    "6": {
      "1": "NCA"
    },
    "7": {
      "1": "200909261522"
    },
    "9": {
      "1": "DFT",
      "2": "P03"
    },
    "10": "152210",
    "11": {
      "1": "T"
    },
    "12": {
      "1": "2.5"
    }
  },
  "EVN": {
    "1": "P03",
    "6": {
      "1": "200909261607"
    }
  },
  "PID": {
    "3": [
      {
        "1": "11401562",
        "2": "",
        "3": "",
        "4": {
          "1": "1013",
          "2": undefined,
          "3": undefined
        },
        "5": "MRN"
      }
    ],
    "5": [
      {
        "1": {
          "1": "HALL",
          "2": undefined,
          "3": undefined,
          "4": undefined,
          "5": undefined
        },
        "2": "MARCUS",
        "3": "A"
      }
    ],
    "7": {
      "1": "19341230"
    },
    "8": "F",
    "11": [
      {
        "1": {
          "1": "1234 Some Street",
          "2": undefined,
          "3": undefined
        },
        "2": "",
        "3": "Davis",
        "4": "CA",
        "5": "95616"
      }
    ],
    "13": [
      {
        "1": "800123456"
      }
    ],
    "18": {
      "1": "SSC313010"
    },
    "19": "05138985"
  },
  "PV1": {
    "3": {
      "1": "NW4"
    },
    "7": [
      {
        "1": "2331",
        "2": {
          "1": "SEEGER, THOMAS",
          "2": undefined,
          "3": undefined,
          "4": undefined,
          "5": undefined
        },
        "3": "A",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": "",
        "9": {
          "1": "1003",
          "2": undefined,
          "3": undefined
        },
        "10": "",
        "11": "",
        "12": "",
        "13": "PRN"
      }
    ],
    "19": {
      "1": "86210313010"
    },
    "44": {
      "1": "20150501"
    }
  },
  "FINANCIAL": [
    {
      "FT1": {
        "1": "1",
        "2": "691234",
        "4": {
          "1": {
            "1": "20090923",
            "2": undefined
          },
          "2": {
            "1": "20090923",
            "2": undefined
          }
        },
        "6": "CG",
        "7": {
          "1": "84460",
          "2": "",
          "3": "PROC"
        },
        "10": "1",
        "11": {
          "1": {
            "1": "125.10",
            "2": undefined
          }
        },
        "13": {
          "1": "MED",
          "2": "",
          "3": "SRCA"
        },
        "19": [
          {
            "1": "123.12",
            "2": "",
            "3": "I9"
          }
        ],
        "20": [
          {
            "1": "2331",
            "2": {
              "1": "SEEGER",
              "2": undefined,
              "3": undefined,
              "4": undefined,
              "5": undefined
            },
            "3": "THOMAS",
            "4": "A",
            "5": "",
            "6": "",
            "7": "",
            "8": "",
            "9": {
              "1": "NPI",
              "2": undefined,
              "3": undefined
            },
            "10": "1003",
            "11": "",
            "12": "",
            "13": "",
            "14": {
              "1": "PRN",
              "2": undefined,
              "3": undefined
            }
          }
        ],
        "21": [
          {
            "1": "2335",
            "2": {
              "1": "COOPER",
              "2": undefined,
              "3": undefined,
              "4": undefined,
              "5": undefined
            },
            "3": "GEORGE",
            "4": "A",
            "5": "",
            "6": "",
            "7": "",
            "8": "",
            "9": {
              "1": "NPI",
              "2": undefined,
              "3": undefined
            },
            "10": "1003",
            "11": "",
            "12": "",
            "13": "",
            "14": {
              "1": "PRN",
              "2": undefined,
              "3": undefined
            }
          }
        ],
        "23": {
          "1": "1024123"
        },
        "25": {
          "1": "99213",
          "2": "Office Visit",
          "3": "ICD9"
        },
        "26": [
          {
            "1": "MOD1"
          },
          {
            "1": "MOD2"
          }
        ],
        "29": {
          "1": "61519-1234-12-01",
          "2": "NDC Description"
        }
      }
    }
  ]
};

var ack = 'MSH|^~\\&|MIRTH||REDOX|RDX|20150915004731||ACK^S12|20150915004731|T|2.3\rMSA|AA|1';
var ackJSON = {
  "MSH": {
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
    "1": "AA",
    "2": "1"
  }
};

describe('Parse an hl7 message', function() {

  var parser;

  before(function () {
    var v2 = require('../../');
    parser = new v2.Parser();
  });

  it('should parse an hl7 message', function () {
    var json = parser.parse(hl7);
    expect(json).to.eql(outputJSON);
  });

  it('should parse an ACK message', function () {
    var json = parser.parse(ack);
    expect(json).to.eql(ackJSON);
  });

  it('should handle non standard delimiters', function () {
    hl7 = hl7.replace(/\|/g, '*').replace(/\^/g, '@').replace(/~/g, '+').replace(/&/g, '$');

    var json = parser.parse(hl7);

    var expected = _.cloneDeep(outputJSON);
    expected.MSH[1] = '*';
    expected.MSH[2] = '@+\\$';


    expect(json).to.eql(expected);
  });
});
