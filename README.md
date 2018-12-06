# node-hl7-v2
This is [Redox's](https://www.redoxengine.com/?utm_source=github&utm_medium=githublink&utm_campaign=open%20source) battle-tested in-house HL7v2 parser/generator. 

Join us in public Slack channel to chat about this project: 

[![slack](http://community.redoxengine.com/badge.svg)](http://community.redoxengine.com)

# HL7 Version 2 (HL7v2) 
[HL7’s Version 2.x (V2) Messaging Standard](http://www.hl7.org/implement/standards/product_brief.cfm?product_id=185) 
is the most ubiquitous healthcare data exchange standard. This module converts HL7v2 messages to and from a JSON representation.

# Usage 
The parser/generator can be used to convert a wide range of HL7v2 messages from the delimited HL7v2 format to a schema-fied JSON version. 
When messages don't match the schema, the module supports a custom schema. See Custom Schemas below for more information. 

## Parser
```
const rawData = `MSH|^~\&|||...`;
const hl7v2 = require('@redoxengine/redox-hl7-v2');
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

const hl7v2 = require('@redoxengine/redox-hl7-v2');
const generator = new HL7v2.Generator();
const data = generator.write(ackJSON);
//`MSH|^~\\&|CHERDABEE||REDOX|RDX|20150915004731||ACK^S12|20150915004731|T|2.3|||||||||\rMSA|AA|1||||\r`
```

# Understanding the HL7v2 schema
Our approach to parsing/generating HL7 is schema-driven. The Schema is based on the HL7v2 specification. 
The best way to understand it is through the schema folder: 
```
schema/
  index.js - entry point to access the schema
  dataTypes/ - contains definitions for each "Data Type" in HL7v2 (See chapter 2A)
  fields/ - contains a definition for each field. Each file is named <Segment>.<Field Number>
  messages/ - contains the actual structure for each message definition, this file also contains "Groups"
  segments/ - contains definitions of which fields are in a segment
  structure/ - contains a map from HL7 message/event type to structure definition. 
``` 
## Basics
There are many events defined in HL7, but some share the same structure. For example ADT^A01 and ADT^A04 both have the same ADT^A01 structure. 

Once the structure is identified the code looks at the corresponding schema in `schema/messages`. Each message definition is object where the properties are "Segment Groups". The Group with the same name as the message type is the root. So in `ORU_R01.json`, the `ORU_R01` property has exactly 1 required `MSH` segment, unlimited `SFT` segments, and a `PATIENT_RESULT` group. 
```
{
  ...
  "ORU_R01": {
    "elements": [
      {
        "minOccurs": "1",
        "maxOccurs": "1",
        "segment": "MSH"
      },
      {
        "minOccurs": "0",
        "maxOccurs": "unbounded",
        "segment": "SFT"
      },
      {
        "minOccurs": "1",
        "maxOccurs": "unbounded",
        "group": "PATIENT_RESULT"
      },
      {
        "minOccurs": "0",
        "maxOccurs": "1",
        "segment": "DSC"
      }
    ]
  }
}
```
## Overriding the schema
Existing HL7v2 implementations don't often respect rules about segment groups and segment order, so custom schemas can be used at will. Pass a JSON object to the constructor of either the parser or the generator to use a custom Schema. It will get merged with the existing schema. 

Examples of custom schemas can be found here: 
* [Adding a Z-segment](./custom_schema_examples/AddZSegment.md)



# HL7 Trademark and IP Statement
HL7® and HEALTH LEVEL SEVEN® are trademarks owned by Health Level Seven International. HL7® and HEALTH LEVEL SEVEN® are registered with the United States Patent and Trademark Office.
