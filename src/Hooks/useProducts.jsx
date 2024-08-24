import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export default function useProducts() {


    function getRecentProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let responseObject= useQuery({
        queryKey:['recentProduct'],
        queryFn: getRecentProduct
    })

  return responseObject
}
