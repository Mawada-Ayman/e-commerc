
import Slider from "react-slick";
import axios from 'axios';
import { useEffect, useState } from "react";


export default function CategorisSlider() {

    const [Categoris, setCategoris] = useState([])

    function getCategoris() {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        setCategoris(data.data);
        
      })
      .catch(()=>{
  
      })
    }
  
    useEffect(() => {
      getCategoris()
    }, [])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 5,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
            slidesToShow: 6,
            slidesToScroll: 2,
            },
        },
        {
            breakpoint: 992,
            settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            },
        },
        {
            breakpoint: 768, 
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            },
        },
        {
            breakpoint: 576, 
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            },
        },
        {
            breakpoint: 400,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            },
        },
        ],
    };

return (
    <div >
        <Slider {...settings}>
            {Categoris.map((category,id)=>
            <div key={id}>
                <img className="h-52 w-full object-cover" src={category.image} alt={category.name} />
                <h3 className="fw-bold fs-4 mt-2" >{category.name}</h3>
            </div>
            )}
    </Slider>
    </div>
    )
}

