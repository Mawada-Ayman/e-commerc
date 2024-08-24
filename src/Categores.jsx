// import { useEffect } from "react";


// export default function Categores() {
//   useEffect(() => {
//     document.title = "Cartegoris Page";
// }, [])



//   return (
//     <>
    
//     </>
//   )
// }


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
      document.title = "Cartegoris Page";
    }, [])



return (
    <div className="row">
            {Categoris.map((category,id)=>
            <div className="p-4 w-full sm:w-1/2 md:w-1/3 categoris" key={id}>
                <div>
                <img className="h-60 img-category w-full object-cover" src={category.image} alt={category.name} />
                <h3 className="fw-bold fs-4 my-4 text-center" >{category.name}</h3>
            </div>
            </div>
            )}
    </div>
    )
}
