import soap from "../mongodb/models/soapEnvelopeSchema.js";

export const SE = async (req, res) => {
  console.log("IP:",req.ip)
  // console.log("inside game save:",req.body);
  try {
    const newSE = new soap(req.body);
    await newSE.save();
    res.status(200).json({ message: "User Saved" });
  } catch (error) {}
};

// const soapEnvelope = new SoapEnvelope({
//     name: 'SOAP-ENV:Envelope',
//     attributes: {
//         "xmlns:SOAP-ENV": 'http://schemas.xmlsoap.org/soap/envelope/'
//     },
//     children: [
//         {
//             name: 'SOAP-ENV:Body',
//             attributes: {},
//             children: [
//                 {
//                     name: 'ns0:ServiceResponse',
//                     attributes: {
//                         "xmlns:ns0": 'safaricom.co.ke/Schemas/SAFService.xsd'
//                     },
//                     children: [
//                         {
//                             name: 'ns0:ResponseHeader',
//                             attributes: {},
//                             children: [
//                                 {
//                                     name: 'ns0:ResponseCode',
//                                     attributes: {},
//                                     children: [],
//                                     value: '1'
//                                 },
//                                 {
//                                     name: 'ns0:ResponseMsg',
//                                     attributes: {},
//                                     children: [],
//                                     value: '999'
//                                 }
//                             ],
//                             value: ''
//                         }
//                     ],
//                     value: ''
//                 }
//             ],
//             value: ''
//         }
//     ],
//     value: ''
// });

// soapEnvelope.save();
