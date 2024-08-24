// import axios from "axios";

// let token = localStorage.getItem('userToken')

// export default function Payment({cartId , shippingAddress}) {
//   return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/
//     ${cartId}url=http://localhost:5173`,
//     {shippingAddress},
//     {headers:{token}}
// )
// }

import axios from "axios";

let token = localStorage.getItem('userToken');

export default function Payment({ cartId, shippingAddress }) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
    { shippingAddress }, 
    {
      params: { url: 'http://localhost:5173' }, // الـ params اللي بتتبعت مع الـ URL
      headers: { token }, // الـ headers
    }
  );
}
