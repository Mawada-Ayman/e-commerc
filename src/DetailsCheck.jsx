
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import useMutationCart from './Hooks/useMutationCart';
import Payment from './APIS/Payment';
import { useLocation } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';


export default function DetailsCheck() {
  let {mutate,data} = useMutationCart(Payment)
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cartId = queryParams.get('cartId');
  
  
  function handelSupmit(shippingAddress) {
    mutate({cartId ,shippingAddress})
  }
  
data?.data?.status == 'success'? window.location.href=data?.data?.session.url :<BounceLoader />
  
  

  let formik = useFormik({
    initialValues:{
      detalis:'',
      phone:'',
      city:''
    },
    onSubmit:handelSupmit
  })



  
    //   e.preventDefault();
    //   const validationErrors = validate();
    //   if (Object.keys(validationErrors).length === 0) {
    //     alert('Form submitted successfully');
    //   } else {
    //     setErrors(validationErrors);
    //   }
    // };

  return (
    <>
<form className='my-10' onSubmit={formik.handleSubmit}>
      <FloatingLabel  label="Details" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Details"
          value={formik.values.detalis}
          onChange={formik.handleChange}
          id='detalis'
        />
      </FloatingLabel>

      <FloatingLabel label="Phone" className="mb-3">
        <Form.Control
          type="tell"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          id='phone'
        />
      </FloatingLabel>

      <FloatingLabel  label="City" className="mb-3">
        <Form.Control
          type="text"
          placeholder="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          id='city'
        />
      </FloatingLabel>

      <div className="text-center">
        <Button variant="outline-success" type='submit' className='w-1/2'>Pay Now</Button>
      </div>
    </form>
    </>
  )
}
