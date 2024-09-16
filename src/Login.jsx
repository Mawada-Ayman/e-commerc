
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from 'yup'
import { userContext } from "./context/UserContext";

export default function Login() {
  useEffect(() => {
    document.title = 'Login Page';
  }, []);
  let {setUserLogin} = useContext(userContext)
  let navigate = useNavigate()
  const [apiError, setapiError] = useState('')
  const [isLoding, setisLoding] = useState(false)

  function handleLogin(values) {
    setisLoding(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
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
      setisLoding(false)
      setapiError(apiRespons.response.data.message);
    }) 
    
}

let validationSchema = Yup.object().shape({
  
  email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  
  password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Must start with a capital letter.')
      .required('Password is required'),
});

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <>
    <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
  {/* Handle error */}
  {apiError ? (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {apiError}
    </div>
  ) : null}
  {/* Handle error */}
  
  <h2 className="py-3 fw-bold fs-4">Login Now</h2>

  {/* Email input */}
  <div className="relative z-0 w-full mb-4 group">
    <input
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.email}
      type="email"
      id="email"
      name="email"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="email"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Enter Your Email :
    </label>
  </div>
  {/* Email alert */}
  {formik.errors.email && formik.touched.email ? (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}
    </div>
  ) : null}
  {/* Email alert */}

  {/* Password input */}
  <div className="relative z-0 w-full mb-4 group">
    <input
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.password}
      type="password"
      id="password"
      name="password"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="password"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Enter Your Password :
    </label>
  </div>
  {/* Password alert */}
  {formik.errors.password && formik.touched.password ? (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      Must start with a capital letter and be between 6 to 10 characters.
    </div>
  ) : formik.touched.password && !formik.errors.password ? (
    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      Password is correct
    </div>
  ) : null}
  {/* Password alert */}

  <div className="block text-center sm:flex justify-between items-center">
    <span className="fw-bold block py-3 sm:py-0">
      <Link to={'/forget'}>forget your password</Link>
    </span>
    <button
      type="submit"
      className="w-full sm:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {isLoding ? <i className="fa fa-spinner fa-spin px-2"></i> : 'Login'}
    </button>
  </div>
</form>
    </>
  );
}