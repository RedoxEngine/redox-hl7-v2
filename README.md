# node-hl7-v2
[Redox's](https://www.redoxengine.com) in-house HL7v2 parser/generator

# HL7 Version 2 (HL7v2) 
[HL7’s Version 2.x (V2) Messaging Standard](http://www.hl7.org/implement/standards/product_brief.cfm?product_id=185) 
is the most ubiquotous healthcare data exchange standard. This module converts HL7v2 messages to and from a JSON version.




# Usage 
The parser/generator can be used to convert a wide range of HL7v2 messages from the delimited HL7v2 format to a schemafied JSON version. 
When messages don't match the schema, the module supports a custom schema. See Custom Schemas below for more information. 

## Parser
```
const rawData = `MSH|^~\&|||...`;
const hl7v2 = require('node-hl7-v2');
const parser = new hl7v2.Parser();
const jsonData = parser.parse(rawData);
```

## Generator
```
const ackJSON = {
  "MSH": {
    "0": "MSH",
    "1": "|",
    "2": "^~\\&",
    "3": {
      "1": "CHERDABEE"
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

const hl7v2 = require('node-hl7-v2');
const generator = new HL7v2.Generator();
const data = generator.write(ackJSON);
//`MSH|^~\\&|CHERDABEE||REDOX|RDX|20150915004731||ACK^S12|20150915004731|T|2.3|||||||||\rMSA|AA|1||||\r`
```


HL7® and HEALTH LEVEL SEVEN® are trademarks owned by Health Level Seven International. HL7® and HEALTH LEVEL SEVEN® are registered with the United States Patent and Trademark Office.
