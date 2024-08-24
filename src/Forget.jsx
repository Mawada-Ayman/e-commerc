

import axios from "axios";
import { useFormik } from "formik";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
// import { userContext } from "./context/UserContext";

export default function Forget() {
  useEffect(() => {
    document.title = 'Forget Page';
  }, []);
//   let {setUserForget} = useContext(userContext)
  let navigate = useNavigate()
  const [apiError, setapiError] = useState('')
  const [isLoding, setisLoding] = useState(false)

  async function handleForget(values) {
    
    try {
        setisLoding(true)
        setapiError('')
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
    if (data.statusMsg === 'success') {
        navigate('/resetCode')
    }
    } 
    catch (error) {
        setisLoding(false)
        setapiError(error.response.data.message);
    }
    

    
}

let validationSchema = Yup.object().shape({
  
  email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
});

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: handleForget
  });

  return (
    <>
      <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
        {/* handel error */}
        {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
      </div>:null}
      {/* handel error */}
        <h2 className="py-3 fw-bold fs-4">Forget password</h2>
        

        <div className="relative z-0 w-full mb-4 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
        </div>
      {/* alert email*/}
      {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}
      </div>:null}
      {/* alert email*/}



        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isLoding ? <i className="fa fa-spinner fa-spin px-2"></i> :'supmit'}</button>
    </form>
    </>
);
}





