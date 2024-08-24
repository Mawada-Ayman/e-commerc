import { useEffect } from "react";
import notfound from '.././src/assets/image/notfound.webp'
import { Link } from "react-router-dom";

export default function Notfound() {
  useEffect(() => {
    document.title = 'Notfound Page';
  }, []);
  return (
    <>
    <div className="flex justify-center items-center">
      <img src={notfound} alt="not fount" />
    </div>
    <div className="text-center">
    <Link type="button" className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      Back to Home
      </Link>
    </div>
    </>
  )
}
