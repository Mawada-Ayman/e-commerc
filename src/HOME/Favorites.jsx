
// import { Button } from "react-bootstrap";
// import useMutationCart from "../Hooks/useMutationCart";
// import addToCartApi from "../APIS/cartApi";


// export default function Favorites({ products }) {

//   var {mutate: addMutate  } = useMutationCart(addToCartApi);


//   return (
//     <div className="row">
//       {products.map((product) => (
//         <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-6">
//           <div className="product py-4 px-2">
//               <img className="w-full" src={product.imageCover} alt={product.title} />
//               <span className="block font-medium text-green-600">{product.category.name}</span>
//               <h2 className="text-lg fw-medium pb-3">{product.title}</h2>
//               <div className="flex justify-between items-center">
//                 <span>{product.price} EGP</span>
//                 <span>{product.ratingsAverage} <i className="fas fa-star text-yellow-400"></i></span>
//               </div>
//               <Button onClick={() => { addMutate(product.id) }} className="w-full" variant="success">+ Add</Button>          </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { Button } from 'react-bootstrap';
import useMutationCart from '../Hooks/useMutationCart';
import addToCartApi from '../APIS/cartApi';

export default function Favorites  ({ products }) {

  var { mutate: addMutate ,mutate: delmutate , status } = useMutationCart(addToCartApi);
 if (status == 'success') {
  console.log('delet');
  
 }

  return (
    <div className="container mx-auto p-4">
      <h2 className=" fs-2 fw-medium">My wish list</h2>
      <table className="w-full  table-auto border-collapse">
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id} className="border-b">
          <td className="p-4 block lg:table-cell">
            <img src={product.imageCover} alt={product.title} className="w-32 h-32 object-cover" />
          </td>
          <td className="block lg:table-cell px-4 py-2 font-semibold text-gray-900 dark:text-white">
            {product?.title}
          </td>
          <td className="block lg:table-cell px-4 py-2 font-semibold text-gray-900 dark:text-white">
            {product?.price} EGP
          </td>
          <td className="block lg:table-cell px-4 py-2">
          <Button onClick={() => { addMutate(product.id) }} className="w-full" variant="success">+ Add to Cart</Button>
          </td>
          <td className="block lg:table-cell px-4 py-2">
            <button
              onClick={() => {
                delmutate(product?.id);
              }}
              type="button"
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Remove
            </button>
          </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="p-4 text-center">
                wish list is empty
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

