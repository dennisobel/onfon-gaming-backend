import mongoose from "mongoose";

const soapEnvelopeSchema = new mongoose.Schema({
    name: String,
    attributes: {
        type: Object,
        required: true
    },
    children: {
        type: Array,
        required: true
    },
    value: String,
    ip: String,
});

const soap = mongoose.model("soapEnvelope", soapEnvelopeSchema);

export default soap;

// import mongoose from "mongoose";

// import mongoose from "mongoose";
// const soapResponseSchema = new mongoose.Schema({
//     name: String,
//     attributes: {
//         'xmlns:SOAP-ENV': String
//     },
//     children: [
//         {
//             name: String,
//             attributes: {},
//             children: [
//                 {
//                     name: String,
//                     attributes: {
//                         'xmlns:ns0': String
//                     },
//                     children: [
//                         {
//                             name: String,
//                             attributes: {},
//                             children: [
//                                 {
//                                     name: String,
//                                     attributes: {},
//                                     children: [],
//                                     value: String
//                                 },
//                                 {
//                                     name: String,
//                                     attributes: {},
//                                     children: [],
//                                     value: String
//                                 }
//                             ],
//                             value: String
//                         }
//                     ],
//                     value: String
//                 }
//             ],
//             value: String
//         }
//     ],
//     value: String
// });

// const soapEnvelope = mongoose.model("soapResponseSchema", soapResponseSchema);

// export default soapEnvelope;
