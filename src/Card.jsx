import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { clearCartApi, deleteCartApi, getCartApi, updateCartApi } from "./APIS/cartApi";
import { RiseLoader } from "react-spinners";
import useMutationCart from "./Hooks/useMutationCart";
import { Link } from "react-router-dom";

export default function Card() {
  useEffect(() => {
    document.title = "Card Page";
  }, []);

  let { isLoading, isError, data } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCartApi,
  });

  let { mutate: delmutate } = useMutationCart(deleteCartApi);
  let { mutate: upmutate } = useMutationCart(updateCartApi);
  let { mutate: clearmutate  } = useMutationCart(clearCartApi);



  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40 w-full">
        <RiseLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" bg-slate-100 my-40  p-5 w-full">
        <h2 className="py-4 fs-2 fw-medium">Cart Shope</h2>
        <h2 className="py-4 fs-2 fw-medium">your cart is empty</h2>
      </div>
    );
  }

  return (
    <>
      {data?.data?.numOfCartItems ? (
        <div className="my-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <div className="block md:flex justify-between items-center p-4">
            <h2 className="py-4 md:py-0 fs-2 fw-medium">Cart Shope</h2>
            <Link to={`/detailscheck?cartId=${data?.data?.data._id}`} className="my-3 text-green-600 hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-600 dark:text-green-600 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-600">
                Check Out
              </Link>
            </div>

              <div className="block md:flex justify-between items-center p-4">
                <h1 className="py-3 fs-4 fw-medium">
                  total number of items:
                  <span className=" text-green-700">
                    {data?.data?.numOfCartItems}
                  </span>
                </h1>
                <h2 className=" fs-4 fw-medium">
                  Total Price :
                  <span className=" text-green-700">
                    {data?.data?.data.totalCartPrice}
                  </span>
                </h2>
              </div>


            

  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="hidden lg:table-header-group text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 py-2">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-4 py-2">Product</th>
        <th scope="col" className="px-4 py-2">Qty</th>
        <th scope="col" className="px-4 py-2">Price</th>
        <th scope="col" className="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {data?.data?.data.products.map((ele) => (
        <tr
          key={ele?._id}
          className="block lg:table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="block lg:table-cell p-4">
            <img
              src={ele?.product?.imageCover}
              className="w-16 md:w-24 lg:w-32 max-w-full max-h-full"
              alt={ele?.product?.title}
            />
          </td>
          <td className="block lg:table-cell px-4 py-2 font-semibold text-gray-900 dark:text-white">
            {ele?.product?.title}
          </td>
          <td className="block lg:table-cell px-4 py-2">
            <div className="flex items-center">
              <button
                onClick={() => {
                  ele.count === 1
                    ? delmutate(ele?.product?._id)
                    : upmutate({
                        id: ele?.product?._id,
                        count: ele?.count ? ele.count - 1 : ele.count,
                      });
                }}
                className="inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                type="button"
              >
                <span className="sr-only">Decrease Quantity</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <div>
                <span>{ele?.count}</span>
              </div>
              <button
                onClick={() => {
                  upmutate({
                    id: ele?.product?._id,
                    count: ele.count + 1,
                  });
                }}
                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                type="button"
              >
                <span className="sr-only">Increase Quantity</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </td>
          <td className="block lg:table-cell px-4 py-2 font-semibold text-gray-900 dark:text-white">
            {ele?.price} EGP
          </td>
          <td className="block lg:table-cell px-4 py-2">
            <button
              onClick={() => {
                delmutate(ele?.product?._id);
              }}
              type="button"
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

            <div className="text-center">
              <button onClick={()=>{clearmutate()}} type="button" className="fs px-5 py-2.5 my-4 text-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg  dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                      Clear Your Cart
                      </button>
              </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-100 p-4 my-10">
            <h2 className="ps-4 fs-2 fw-medium">Cart Shope</h2>
            <div className="block  md:flex justify-between items-center p-4">
                <h1 className="py-3 fs-4 fw-medium">
                  total number of items:
                  <span className=" text-green-700">
                    {data?.data?.numOfCartItems}
                  </span>
                </h1>
                <h2 className=" fs-4 fw-medium">
                  Total Price :
                  <span className=" text-green-700">
                    {data?.data?.data.totalCartPrice}
                  </span>
                </h2>
              </div>
            <button className="ms-4 mb-4  text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
              Check Out
            </button>
            <div className="text-center">
              <button onClick={()=>{clearmutate()}} type="button" className="fs px-5 py-2.5 my-4 text-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg  dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                      Clear Your Cart
                      </button>
              </div>
          </div>
        </>
      )}
    </>
  );
}
