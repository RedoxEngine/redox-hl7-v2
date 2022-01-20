const { expect } = require('chai');

var json = {
  "MSH": {
    "0": "MSH",
    "1": "|",
    "2": "^~&",
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
    "0": "EVN",
    "1": "P03",
    "6": {
      "1": "200909261607"
    }
  },
  "PID": {
    "0": "PID",
    "3": [
      {
        "1": "11401562",
        "2": "",
        "3": "",
        "4": {
          "1": "1013"
        },
        "5": "MRN"
      }
    ],
    "5": [
      {
        "1": {
          "1": "HALL"
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
          "1": "1234 Some Street"
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
    "0": "PV1",
    "3": {
      "1": "NW4"
    },
    "7": [
      {
        "1": "2331",
        "2": {
          "1": "SEEGER, THOMAS"
        },
        "3": "A",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": "",
        "9": {
          "1": "1003"
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
        "0": "FT1",
        "1": "1",
        "2": "691234",
        "4": {
          "1": {
            "1": "20090923"
          },
          "2": {
            "1": "20090923"
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
            "1": "125.10"
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
              "1": "SEEGER"
            },
            "3": "THOMAS",
            "4": "A",
            "5": "",
            "6": "",
            "7": "",
            "8": "",
            "9": {
              "1": "NPI"
            },
            "10": "1003",
            "11": "",
            "12": "",
            "13": "",
            "14": {
              "1": "PRN"
            }
          }
        ],
        "21": [
          {
            "1": "2335",
            "2": {
              "1": "COOPER"
            },
            "3": "GEORGE",
            "4": "A",
            "5": "",
            "6": "",
            "7": "",
            "8": "",
            "9": {
              "1": "NPI"
            },
            "10": "1003",
            "11": "",
            "12": "",
            "13": "",
            "14": {
              "1": "PRN"
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


var outputHL7 = 'MSH|^~\\&|HMS03|NCA|EPIC|NCA|200909261522||DFT^P03|152210|T|2.5|||||||||\r\
EVN|P03|||||200909261607|\r\
PID|||11401562^^^1013^MRN||HALL^MARCUS^A||19341230|F|||1234 Some Street^^Davis^CA^95616||800123456|||||SSC313010|05138985||||||||||||||||||||\r\
PV1|||NW4||||2331^SEEGER, THOMAS^A^^^^^^1003^^^^PRN||||||||||||86210313010|||||||||||||||||||||||||20150501||||||||\r\
FT1|1|691234||20090923^20090923||CG|84460^^PROC|||1|125.10||MED^^SRCA||||||123.12^^I9|2331^SEEGER^THOMAS^A^^^^^NPI^1003^^^^PRN|2335^COOPER^GEORGE^A^^^^^NPI^1003^^^^PRN||1024123||99213^Office Visit^ICD9|MOD1~MOD2|||61519-1234-12-01^NDC Description||\r\
';

var ack = 'MSH|^~\\&|MIRTH||REDOX|RDX|20150915004731||ACK^S12|20150915004731|T|2.3|||||||||\rMSA|AA|1||||\r';
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


describe('Generate an hl7 message', function() {

  var generator;

  before(function () {
    var v2 = require('../../');
    generator = new v2.Generator();
  });

  it('should write an hl7 message', function () {
    var hl7 = generator.write(json);
    expect(hl7).to.equal(outputHL7);
  });

  it('should write an ACK message', function () {
    var hl7 = generator.write(ackJSON);
    expect(hl7).to.equal(ack);

  });

  it('should write using alternate delimiters', function () {
    var generator = new v2.Generator(null, {
      field: '*',
      component: '@',
      repetition: '+',
      subComponent: '$',
      escape: '\\'
    });
    outputHL7 = outputHL7.replace(/\|/g, '*').replace(/\^/g, '@').replace(/~/g, '+').replace(/&/g, '$');

    json.MSH[1] = '*';
    json.MSH[2] = '@+\\$';

    var hl7 = generator.write(json);
    
    expect(hl7).to.equal(outputHL7);
  });

  const json = {
    MSH: {
      '1': '|',
      '2': '^~\\&',
      '3': { '1': 'EPIC' },
      '4': { '1': 'AcmeHeath' },
      '7': { '1': '20190131140825' },
      '8': 'JFARNHAM',
      '9': { '1': 'ADT', '2': 'A13' },
      '10': '17715',
      '11': { '1': 'T' },
      '12': { '1': '2.3' }
    },
    EVN: {
      '1': 'A13',
      '2': { '1': '20190131140825' },
      '4': 'ADT',
      '5': [
        {
          '1': 'JFARNHAM',
          '2': { '1': 'FARNHAM' },
          '3': 'JACOB',
          '4': '',
          '5': '',
          '6': '',
          '7': '',
          '8': '',
          '9': { '1': 'SW' },
          '10': '',
          '11': '',
          '12': '',
          '13': '',
          '14': { '1': 'RRCE' }
        }
      ],
      '6': { '1': '20181231110700' }
    },
    PID: {
      '3': [
        {
          '1': '740001776',
          '2': '',
          '3': '',
          '4': { '1': 'AMRN' },
          '5': 'AMRN'
        },
        {
          '1': '1003132339',
          '2': '',
          '3': '',
          '4': { '1': 'EID' },
          '5': 'EID'
        }
      ],
      '5': [ { '1': { '1': 'OPTIMEOBTEST' }, '2': 'WAHH' } ],
      '7': { '1': '19881228' },
      '8': 'F',
      '11': [
        {
          '1': { '1': '111 TEST ST' },
          '2': '',
          '3': 'TEMPLE',
          '4': 'TX',
          '5': '76501',
          '6': 'USA',
          '7': 'P',
          '8': '',
          '9': 'BELL'
        }
      ],
      '12': 'BELL',
      '13': [
        {
          '1': '(254)555-5555',
          '2': 'P',
          '3': 'PH',
          '4': '',
          '5': '',
          '6': '254',
          '7': '5555555'
        },
        {
          '1': '',
          '2': 'NET',
          '3': 'Internet',
          '4': 'devpatient.male@example.io'
        }
      ]
    },
    PD1: {
      '3': [ { '1': 'Acme Health', '2': '', '3': '1034001' } ],
      '4': [
        {
          '1': '130991',
          '2': { '1': 'CHANG' },
          '3': 'SARAH',
          '4': 'ANNE',
          '5': '',
          '6': '',
          '7': '',
          '8': '',
          '9': { '1': 'EPIC' },
          '10': '',
          '11': '',
          '12': '',
          '13': 'PROVID'
        }
      ]
    },
    ROL_1: [
      {
        '1': { '1': '1' },
        '2': 'UP',
        '3': { '1': 'GENERAL' },
        '4': [
          {
            '1': '1194750331',
            '2': { '1': 'ROSENBERG' },
            '3': 'DANIEL',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': { '1': 'EPIC' },
            '10': '',
            '11': '',
            '12': '',
            '13': 'PNPI'
          },
          {
            '1': '20255',
            '2': { '1': 'ROSENBERG' },
            '3': 'DANIEL',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': { '1': 'OR STAR SER' },
            '10': '',
            '11': '',
            '12': '',
            '13': 'OR STAR SER'
          },
          {
            '1': '1188',
            '2': { '1': 'ROSENBERG' },
            '3': 'DANIEL',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': { '1': 'CL CENT SER' },
            '10': '',
            '11': '',
            '12': '',
            '13': 'CL CENT SER'
          },
          {
            '1': '1000220',
            '2': { '1': 'ROSENBERG' },
            '3': 'DANIEL',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': { '1': 'PROVPID' },
            '10': '',
            '11': '',
            '12': '',
            '13': 'PPID'
          }
        ],
        '5': { '1': '20190925' },
        '9': [ { '1': 'GENERAL' } ],
        '11': [
          {
            '1': { '1': '1321 NE 99TH AVE. STE 200' },
            '2': '',
            '3': 'PORTLAND',
            '4': 'OR',
            '5': '97220',
            '6': ''
          }
        ],
        '12': [
          {
            '1': '(503)215-4250',
            '2': '',
            '3': 'W',
            '4': '',
            '5': '',
            '6': '503',
            '7': '2154250'
          }
        ]
      }
    ],
    PV1: {
      '2': 'INPATIENT',
      '3': {
        '1': 'WHHPP',
        '2': '2101',
        '3': '01',
        '4': { '1': 'TEH' },
        '5': 'R',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': { '1': '' },
        '11': { '1': 'DEPID' }
      },
      '4': 'EL',
      '7': [
        {
          '1': '01164',
          '2': { '1': 'BEAIRD' },
          '3': 'MARK',
          '4': 'ALAN',
          '5': '',
          '6': '',
          '7': '',
          '8': '',
          '9': { '1': 'EPIC' },
          '10': '',
          '11': '',
          '12': '',
          '13': 'PROVID'
        }
      ],
      '10': 'Obstetrics',
      '14': 'Phys/Clinic',
      '17': [
        {
          '1': '01164',
          '2': { '1': 'BEAIRD' },
          '3': 'MARK',
          '4': 'ALAN',
          '5': '',
          '6': '',
          '7': '',
          '8': '',
          '9': { '1': 'EPIC' },
          '10': '',
          '11': '',
          '12': '',
          '13': 'PROVID'
        }
      ],
      '19': { '1': '90000000083' },
      '44': { '1': '20181228101200' },
      '47': '16429.19'
    },
    PV2: { '9': { '1': '20181231' }, '10': '3' },
    ROL_2: [
      {
        '1': { '1': '2' },
        '2': 'UP',
        '3': { '1': 'NP' },
        '4': [
          {
            '1': '1255688719',
            '2': { '1': 'NGUY' },
            '3': 'SCOTT',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': { '1': 'EPIC' },
            '10': '',
            '11': '',
            '12': '',
            '13': 'PNPI'
          },
          {
            '1': '54004',
            '2': { '1': 'NGUY' },
            '3': 'SCOTT',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': { '1': 'OR STAR SER' },
            '10': '',
            '11': '',
            '12': '',
            '13': 'OR STAR SER'
          },
          {
            '1': '1204658',
            '2': { '1': 'NGUY' },
            '3': 'SCOTT',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': { '1': 'PROVPID' },
            '10': '',
            '11': '',
            '12': '',
            '13': 'PPID'
          }
        ],
        '5': { '1': '20191001102337' },
        '11': [
          {
            '1': { '1': '15640 NW LAIDLAW RD, STE 102' },
            '2': '',
            '3': 'PORTLAND',
            '4': '',
            '5': '',
            '6': 'USA'
          }
        ],
        '12': [
          {
            '1': '(503)764-0100',
            '2': '',
            '3': 'W',
            '4': '',
            '5': '',
            '6': '503',
            '7': '7640100'
          },
          {
            '1': '(503)536-4260',
            '2': '',
            '3': 'FAX',
            '4': '',
            '5': '',
            '6': '503',
            '7': '5364260'
          }
        ]
      }
    ],
    DG1: [
      {
        '2': 'AB',
        '3': {
          '1': 'Z34.93',
          '2': 'Encounter for supervision of normal pregnancy, unspecified, third trimester',
          '3': 'ABF'
        },
        '4': 'Encounter for supervision of normal pregnancy, unspecified, third trimester',
        '6': '^1'
      }
    ]
  };

  it('should write segments of the same type that occur in multiple places in the same group in the appropriate places', function () {
    const hl7 = generator.write(json);

    // For debug purposes, print out the full hl7.
    // console.log('Generated HL7');
    // console.log(hl7.replace(/\r/g, '\n'));

    // A global search for the start of the message only turns up one occurrence.
    const header = hl7.match(/MSH\|\^~\\&\|EPIC\|AcmeHeath\|\|\|20190131140825/g);
    expect(header.length).to.equal(1);

    // A global search for the beginning of the first ROL segment
    const rol1 = hl7.match(/ROL\|1\|UP\|GENERAL\|1194750331\^ROSENBERG\^DANIEL/g);
    expect(rol1.length).to.equal(1);

    // A global search for the beginning of the second ROL segment
    const rol2 = hl7.match(/ROL\|2\|UP\|NP\|1255688719\^NGUY\^SCOTT/g);
    expect(rol2.length).to.equal(1);
  });

  it('should write segments correctly when an array is supplied and a single segment is expected', function () {
    const json2 = { ...json };
    json2.EVN = [json2.EVN, json2.EVN];
    const hl7 = generator.write(json2);
    console.log(hl7.replace(/\r/g, '\n'));

    // A global search for the EVN segment turns up one occurrence.
    const evn = hl7.match(/EVN\|A13\|20190131140825\|\|ADT\|JFARNHAM\^FARNHAM/g);
    expect(evn.length).to.equal(1);
  })
});
