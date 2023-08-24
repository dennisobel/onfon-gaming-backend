import https from 'https';
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 }); // retry failed requests 3 times

export const headless = async (req,res) => {
    try {
        await axios.request("https://header.safaricombeats.co.ke/", {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
                // requestCert: false,
                // agent: false,
             
            })
        }).then((response) => {
            res.status(200).json({message:"Header sent successfully", data:response.data})
        })
        .catch((err) => {console.log("err:",err)})
        // let parsedData = new XMLParser().parseFromString(headerRes.data)

        // res.status(200).json({message:"Header sent successfully", data:headerRes.data})
    } catch (error) {
        console.log("Error sending header",error)
    }





}