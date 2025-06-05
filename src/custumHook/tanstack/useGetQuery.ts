import axios from "axios"
import { useQuery } from "@tanstack/react-query"



const useGetQuery = <T>(url:string , key:string[]  ) =>{
    const getList = async():Promise<T>=>{
        const result = await axios.get(url)
        return result.data
    }
    
    return useQuery({
        queryKey: key,
        queryFn: getList,
    });
};

export { useGetQuery };
