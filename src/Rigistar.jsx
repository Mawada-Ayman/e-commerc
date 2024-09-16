
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from 'yup'
import { userContext } from "./context/UserContext";

export default function Register() {
  useEffect(() => {
    document.title = 'Register Page';
  }, []);
  let {setUserLogin} = useContext(userContext)

  let navigate = useNavigate()
  const [apiError, setapiError] = useState('')
  const [isLoding, setisLoding] = useState(false)

  function handleRegister(values) {
    setisLoding(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .then(  (response) => {
      if(response.data.message === 'success') 
      {
        localStorage.setItem('userToken' , response.data.token)
        setUserLogin(response.data.token)
        setisLoding(false)
        navigate('/')
      }
    })
    .catch( (apiRespons) => {
      console.log(apiRespons.response.data.message);
      
      setisLoding(false)
      setapiError(apiRespons.response.data.message);
    }) 
    
}

let validationSchema = Yup.object().shape({
  name: Yup.string()
      .min(3, 'Name minLength is 3')
      .max(10, 'Name maxLength is 10')
      .required('Name is required'),
  
  email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  
  phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Phone is invalid')
      .required('Phone is required'),
  
  password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password is invalid')
      .required('Password is required'),
  
  rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'RePassword does not match')
      .required('RePassword is required'),
});

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return (
    <>
      <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
        {/* handel error */}
        {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
      </div>:null}
      {/* handel error */}
        <h2 className="py-3 fw-bold fs-4">Register Now</h2>
        <div className="relative z-0 w-full mb-4 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id="name" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
        </div>

      {/* alert name*/}
      {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.name}
      </div>:null}
      {/* alert name*/}

        <div className="relative z-0 w-full mb-4 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
        </div>

      {/* alert email*/}
      {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}
      </div>:null}
      {/* alert email*/}

        <div className="relative z-0 w-full mb-4 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone Number :</label>
        </div>
        
        {/* alert phone*/}
      {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.phone}
      </div>:null}
      {/* alert email*/}

        <div className="relative z-0 w-full mb-4 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
        </div>

        {/* alert password*/}
      {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.password}
      </div>:null}
      {/* alert password*/}

        <div className="relative z-0 w-full mb-4 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id="rePassword" name="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Your Password :</label>
        </div>

      {/* alert repassword*/}
      {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.rePassword}
      </div>:null}
      {/* alert repassword*/}
      <div className="block sm:flex justify-between items-center">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {isLoding ? <i className="fa fa-spinner fa-spin px-2"></i> :'supmit'}</button>

          <p className="py-3 sm:py-0">you have account ? <span className="fw-bold "> <Link to={'/login'}>login Now</Link></span></p>
          </div>
      </form>
    </>
  );
}





