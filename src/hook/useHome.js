import { useQuery } from "@tanstack/react-query";
import { fetchingStations} from "../api/homeApi";

export const useSourceHome = (name) => {
    
    return useQuery({
        queryKey: ['stations', name ],
        queryFn: () => fetchingStations(name)
    })
}

