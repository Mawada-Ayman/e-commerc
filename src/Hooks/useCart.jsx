import { useQuery } from "@tanstack/react-query";


export default function useCart(key,fn) {
  return useQuery({
    queryKey:[key],
     queryFn:fn,
     select:(data)=>data?.data,
    })
}
