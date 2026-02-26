import { useQuery } from "@tanstack/react-query";
import { fetchTrainsList } from "../api/trainListApi";

export const useTrainsList = (sourceCode, destinationCode) => {

    return useQuery({
        queryKey: [`trainsList`, sourceCode, destinationCode],
        queryFn: () => fetchTrainsList(sourceCode, destinationCode),
        enabled: !!sourceCode && !!destinationCode,
        staleTime: 5*60*1000,
        cacheTime: 10*60*1000,
    })

}