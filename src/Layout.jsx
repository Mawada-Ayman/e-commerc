import { Outlet } from "react-router-dom";
// import Footer from "./Footer";
import Anavbar from "./Anavbar";


export default function Layout() {
  return (
    <>
      <Anavbar/>
      <div className="container mx-auto py-6 my-6 ">
      <Outlet/>
      </div>
      {/* <Footer/> */}
      </>
  )
}
