/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"


export default function ProtectedRout({children}) {

    if (localStorage.getItem('userToken') !== null)
    {
        return children
        
    }
    else
    {
        return <Navigate to={'/login'}/>
        
    }


}
