import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import {RiseLoader} from 'react-spinners'


export default function Brands() {

  useEffect(() => {
    document.title = 'Brands Page';
  }, []);

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let {data , isError , error , isLoading}= useQuery({
    queryKey:['getBrand'],
    queryFn: getBrands, 
    select:(data)=>data?.data?.data
})



if (isLoading) {
  return <div className='flex justify-center items-center py-40 w-full'>
      <RiseLoader />
  </div>
}

if (isError) {
  return <div className='flex justify-center items-center py-40 w-full'>
      {error}
  </div>
}


  return (
    <>
        <div className="row">
          <h2 className="text-center fw-medium text-green-600 fs-1 py-4"> All Brands</h2>
          {data.map((brand)=>
          <div key={brand?._id} className="md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
            <div className="brand ">
              <img src={brand?.image} alt={brand.name} />
              <p className="py-3 text-center">{brand.name}</p>
            </div>
          </div>
          )}
        </div>
    </>
  )
}
