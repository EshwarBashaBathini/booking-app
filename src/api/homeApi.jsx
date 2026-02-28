import {apiClient} from '../lib/apiClient'

export const fetchingStations = async(name) => {

    const response = await apiClient.get(`/stations/search?q=${name}`)
    return response.data

}
