
import axios from "axios";
import { useFormik } from "formik";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reset() {
  useEffect(() => {
    document.title = 'Forget Page';
  }, []);
  
  let navigate = useNavigate()
  const [apiError, setapiError] = useState('')
  const [isLoding, setisLoding] = useState(false)

  async function handlereset(values) {
    
    try {
        setisLoding(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
        setisLoding(false)
        setapiError('')
        navigate('/newpassword')
        

    } 
    catch (error) {
        setisLoding(false)
        setapiError(error.response.data.message);
        
    }
}


  let formik = useFormik({
    initialValues: {
        resetCode: '',
    },
    onSubmit: handlereset
  });

  return (
    <>
      <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
        {/* handel error */}
        {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
      </div>:null}
      {/* handel error */}
        <h2 className="py-3 fw-bold fs-4">reset code</h2>
        

        <div className="relative z-0 w-full mb-4 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" id="resetCode" name="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="resetCode"
           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Reset Code
          </label>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isLoding ? <i className="fa fa-spinner fa-spin px-2"></i> :'supmit'}</button>
    </form>
    </>
);
}





