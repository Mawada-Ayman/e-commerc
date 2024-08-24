
import {useParams } from "react-router-dom";
import axios from 'axios';
import { useState ,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Slider from "react-slick";
import useMutationCart from "../Hooks/useMutationCart";
import addToCartApi from "../APIS/cartApi";
import { toast } from "react-toastify";

export default function ProductDetails() {

  let {status,mutate:addMutate,data} = useMutationCart(addToCartApi)

  if (status == 'success') {
      toast.success(data?.data?.message)
  }

  
  let {id} = useParams()
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 5,
  };
  
  const [ProductDetails, setProductDetails] = useState(null)
  
  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      setProductDetails(data.data);
      
    })
    .catch(()=>{

    })
  }

  useEffect(() => {
    getProductDetails(id)
  }, [])
  

  

  return (
    <div className="row">
  <div className="w-full md:w-1/2 lg:w-1/3 p-4">
    <Slider {...settings}>
      {ProductDetails?.images.map((src) => 
        <img key={id} className="p-7" src={src} alt={ProductDetails?.title} />
      )}
    </Slider>
  </div>
  <div className="w-full md:w-1/2 lg:w-2/3 p-6">
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-950">{ProductDetails?.title}</h1>
    <p className="text-gray-600 font-light mt-3">{ProductDetails?.description}</p>
    <div className="flex justify-between items-center mt-6">
      <span className="text-lg md:text-xl">{ProductDetails?.price} EGP</span>
      <span className="text-lg md:text-xl">
        {ProductDetails?.ratingsAverage} <i className="fas fa-star text-yellow-400"></i>
      </span>
    </div>
    <Button onClick={()=>(addMutate(ProductDetails.id))} className="mt-8 md:mt-10 w-full md:w-5/6" variant="success">+ Add</Button>
  </div>
</div>

  )
}
