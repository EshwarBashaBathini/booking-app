import axios from "axios";
import url from "../components/url";

export const fetchingSourceStations = async(name) => {

    const response = await axios.get(`${url}/stations/search?q=${name}`,{
        headers: {
            'Content-type': 'application/json',
        }
    })
    return response.data

}

export const fetchingDestinationStations = async(name) => {

    const response = await axios.get(`${url}/stations/search?q=${name}`,{
        headers: {
            'Content-type': 'application/json',
        }
    })
    return response.data

}
