import { useQuery } from "@tanstack/react-query";
import { fetchingSourceStations, fetchingDestinationStations } from "../api/homeApi";

export const useSourceHome = (name) => {
    
    return useQuery({
        queryKey: ['stations', name ],
        queryFn: () => fetchingSourceStations(name)
    })
}

export const useDestinationHome = (name) => {
    
    return useQuery({
        queryKey: ['stations', name ],
        queryFn: () => fetchingDestinationStations(name)
    })
}