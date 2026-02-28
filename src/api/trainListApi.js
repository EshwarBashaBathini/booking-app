import url from "../components/url";
import axios from "axios";

export const fetchTrainsList = async (sourceCode, destinationCode) => {
  
    const response = await axios.get(`${url}/trains/search?from=${sourceCode}&to=${destinationCode}`, {
        headers: {
            'Content-type': 'application/json',
        }
    })
   
    return response.data.data
}