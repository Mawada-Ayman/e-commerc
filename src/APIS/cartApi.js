import axios from "axios";


let baseUrl = `https://ecommerce.routemisr.com/api/v1`
let token = localStorage.getItem("userToken")

// add to card

export default function addToCartApi(productId) {
  return (
    axios.post(`${baseUrl}/cart` , {productId} , 
        {headers : {
            token
        }}
    )
  )
}


// get data

export function getCartApi() {
    return axios.get(`${baseUrl}/cart`,
        {headers : {
            token
        }}
    )
}


// delete item

export function deleteCartApi(id) {
    return axios.delete(`${baseUrl}/cart/${id}`,
        {headers : {
            token
        }}
    )
}


// update item

export function updateCartApi({id,count}) {
    return axios.put(`${baseUrl}/cart/${id}`,{count},
        {headers : {
            token
        }}
    )
}




// clear item

export function clearCartApi() {
    return axios.delete(`${baseUrl}/cart`,
        {headers : {
            token
        }}
    )
}


