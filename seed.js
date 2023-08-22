// import mongoose from "mongoose";
// // const SoapEnvelope = require('./mongodb/models/soapEnvelopeSchema.js');
// import soapEnvelope from "./mongodb/models/soapEnvelopeSchema.js";

// const seedData = async () => {
//     const sE = new soapEnvelope({
//         name: 'SOAP-ENV:Envelope',
//         attributes: {
//             "xmlns:SOAP-ENV": 'http://schemas.xmlsoap.org/soap/envelope/'
//         },
//         children: [
//             {
//                 name: 'SOAP-ENV:Body',
//                 attributes: {},
//                 children: [
//                     {
//                         name: 'ns0:ServiceResponse',
//                         attributes: {
//                             "xmlns:ns0": 'safaricom.co.ke/Schemas/SAFService.xsd'
//                         },
//                         children: [
//                             {
//                                 name: 'ns0:ResponseHeader',
//                                 attributes: {},
//                                 children: [
//                                     {
//                                         name: 'ns0:ResponseCode',
//                                         attributes: {},
//                                         children: [],
//                                         value: '1'
//                                     },
//                                     {
//                                         name: 'ns0:ResponseMsg',
//                                         attributes: {},
//                                         children: [],
//                                         value: '999'
//                                     }
//                                 ],
//                                 value: ''
//                             }
//                         ],
//                         value: ''
//                     }
//                 ],
//                 value: ''
//             }
//         ],
//         value: ''
//     });

//     await sE.save();
// };

// export default seedData

// const mongoose = require("mongoose");
// const SoapResponse = require("./soapResponse"); 

// Connect to MongoDB
import mongoose from "mongoose";
import soapEnvelope from "./mongodb/models/soapEnvelopeSchema.js";

mongoose.connect("mongodb+srv://onfongaming:Maria09092021@cluster0.ftlwvsp.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Create a new document
    const soapResponseData = {
      name: "SOAP-ENV:Envelope",
      attributes: {
        "xmlns:SOAP-ENV": "http://schemas.xmlsoap.org/soap/envelope/",
      },
      children: [
        {
          name: "SOAP-ENV:Body",
          attributes: {},
          children: [
            {
              name: "ns0:ServiceResponse",
              attributes: {
                "xmlns:ns0": "safaricom.co.ke/Schemas/SAFService.xsd",
              },
              children: [
                {
                  name: "ns0:ResponseHeader",
                  attributes: {},
                  children: [
                    {
                      name: "ns0:ResponseCode",
                      attributes: {},
                      children: [],
                      value: "1",
                    },
                    {
                      name: "ns0:ResponseMsg",
                      attributes: {},
                      children: [],
                      value: "999",
                    },
                  ],
                  value: "",
                },
              ],
              value: "",
            },
          ],
          value: "",
        },
      ],
      value: "",
    };
    const newSoapResponse = new soapEnvelope(soapResponseData);

    // Save the document
    newSoapResponse
      .save()
      .then((savedResponse) => {
        console.log("SoapResponse saved:", savedResponse);
      })
      .catch((error) => {
        console.error("Error saving SoapResponse:", error);
      })
      .finally(() => {
        mongoose.disconnect(); // Disconnect from MongoDB
      });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
