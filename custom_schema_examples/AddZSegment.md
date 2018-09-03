Z-Segments are custom-defined segments within the HL7 specification. Usually, they convey some information that is not available in the base specification. 

This custom schema adds all the pieces for a new `ZRX` segment and allows it in an `ORM_O01` message.


```
{
    "fields": {
        "ZRX.1": {
            "dataType": "ST"
        },
        "ZRX.2": {
            "dataType": "ST"
        },
        "ZRX.3": {
            "dataType": "ST"
        },
        "ZRX.4": {
            "dataType": "ST"
        },
        "ZRX.5": {
            "dataType": "ST"
        },
        "ZRX.6": {
            "dataType": "ST"
        },
        "ZRX.7": {
            "dataType": "ST"
        },
        "ZRX.8": {
            "dataType": "ST"
        },
        "ZRX.9": {
            "dataType": "ST"
        }
    },
    "messages": {
        "ORM_O01": {
            "ORDER": {
                "elements": [
                    {
                        "segment": "ORC",
                        "maxOccurs": "1",
                        "minOccurs": "1"
                    },
                    {
                        "group": "ORDER_DETAIL",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "FT1",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "CTI",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "BLG",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    }
                ]
            },
            "ORM_O01": {
                "elements": [
                    {
                        "segment": "MSH",
                        "maxOccurs": "1",
                        "minOccurs": "1"
                    },
                    {
                        "segment": "NTE",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    },
                    {
                        "group": "PATIENT",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "group": "ORDER",
                        "maxOccurs": "unbounded",
                        "minOccurs": "1"
                    },
                    {
                        "segment": "ZRX",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    }
                ]
            },
            "PATIENT": {
                "elements": [
                    {
                        "segment": "PID",
                        "maxOccurs": "1",
                        "minOccurs": "1"
                    },
                    {
                        "segment": "PD1",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "NTE",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    },
                    {
                        "group": "PATIENT_VISIT",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "group": "INSURANCE",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "GT1",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "AL1",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    }
                ]
            },
            "INSURANCE": {
                "elements": [
                    {
                        "segment": "IN1",
                        "maxOccurs": "1",
                        "minOccurs": "1"
                    },
                    {
                        "segment": "IN2",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "IN3",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    }
                ]
            },
            "OBSERVATION": {
                "elements": [
                    {
                        "segment": "OBX",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "NTE",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    }
                ]
            },
            "ORDER_DETAIL": {
                "elements": [
                    {
                        "group": "OBRRQDRQ1RXOODSODT_SUPPGRP",
                        "maxOccurs": "1",
                        "minOccurs": "1"
                    },
                    {
                        "segment": "NTE",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "CTD",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "DG1",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    },
                    {
                        "group": "OBSERVATION",
                        "maxOccurs": "unbounded",
                        "minOccurs": "0"
                    }
                ]
            },
            "PATIENT_VISIT": {
                "elements": [
                    {
                        "segment": "PV1",
                        "maxOccurs": "1",
                        "minOccurs": "1"
                    },
                    {
                        "segment": "PV2",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    }
                ]
            },
            "OBRRQDRQ1RXOODSODT_SUPPGRP": {
                "elements": [
                    {
                        "segment": "OBR",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "RQD",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "RQ1",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "RXO",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "ODS",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    },
                    {
                        "segment": "ODT",
                        "maxOccurs": "1",
                        "minOccurs": "0"
                    }
                ]
            }
        }
    },
    "segments": {
        "ZRX": {
            "fields": [
                {
                    "field": "ZRX.1",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                },
                {
                    "field": "ZRX.2",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                },
                {
                    "field": "ZRX.3",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                },
                {
                    "field": "ZRX.4",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                },
                {
                    "field": "ZRX.5",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                },
                {
                    "field": "ZRX.6",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                },
                {
                    "field": "ZRX.7",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                },
                {
                    "field": "ZRX.8",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                },
                {
                    "field": "ZRX.9",
                    "maxOccurs": "1",
                    "minOccurs": "0"
                }
            ]
        }
    }
}
```