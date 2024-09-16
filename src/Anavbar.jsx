import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "./context/UserContext";
import logo from'.././src/assets/logo.svg'
import useCart from './Hooks/useCart'
import { getCartApi } from "./APIS/cartApi";

export default function Anavbar() {

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(expanded ? false : "expanded");
  };

  const handleLinkClick = () => {
    setExpanded(false);
  };

  let { data } = useCart('getCart', getCartApi)


  let { userLogin, setUserLogin } = useContext(userContext);
  let navigate = useNavigate()

  function logout() {
    localStorage.removeItem('userToken')
    setUserLogin(null)
    navigate('/login')
    
  }

  return (
    <Navbar expanded={expanded} onToggle={handleToggle} expand="lg" className="bg-body-tertiary py-10 position-fixed top-0 bottom-0 right-0 left-0 nav z-50">
      <Container>
        <NavLink to={""}   className="fw-bolder text-xl mx-2">
          <img  src={logo} alt="logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="items-center m-auto bg-slate-50 p-4 sm:bg-slate-50 p-4 md:bg-slate-50 p-4 lg:bg-transparent">
            {userLogin !==null ?
          <>
            <NavLink className="text-black py-1 sm:py-1 md:py-1 lg:py-0 fw-medium mx-2" onClick={handleLinkClick} to={""}>
              Home
            </NavLink>
            <NavLink className="text-black py-1 sm:py-1 md:py-1 lg:py-0 fw-medium mx-2" onClick={handleLinkClick} to={"card"}>
              Cart
            </NavLink>
            <NavLink className="text-black py-1 sm:py-1 md:py-1 lg:py-0 fw-medium mx-2" onClick={handleLinkClick} to={"product"}>
              product
            </NavLink>
            <NavLink className="text-black py-1 sm:py-1 md:py-1 lg:py-0 fw-medium mx-2" onClick={handleLinkClick} to={"categores"}>
              categores
            </NavLink>
            <NavLink className="text-black py-1 sm:py-1 md:py-1 lg:py-0 fw-medium mx-2" onClick={handleLinkClick} to={"brands"}>
              brands
            </NavLink>
            <NavLink className="text-black py-1 sm:py-1 md:py-1 lg:py-0 fw-medium mx-2" onClick={handleLinkClick} to={"favorits"}>
              Favorits
            </NavLink>
          </>
            :null}
          </Nav>
          <Nav className="items-center bg-slate-50 px-4 sm:bg-slate-50 px-4 md:bg-slate-50 px-4 lg:bg-transparent">
            {userLogin == null ? <>
            <NavLink className=" text-black py-1 sm:py-1 md:py-1 lg:py-0 fw-medium mx-2" onClick={handleLinkClick} to={"login"}>
              Login
            </NavLink>
            <NavLink className="text-black py-1 sm:py-1 md:py-1 lg:py-0 fw-medium mx-2" onClick={handleLinkClick} to={"rigistar"}>
              Rigistar
            </NavLink>
          </>
              :<span onClick={logout} className="text-black fw-medium mx-2 cursor-pointer">
                <h2 className="fs-5">Logout</h2>
                </span>
              }
              <Link to={'/card'}>
                <li className="relative m-3 sm:my-4 md:my-4 lg:my-0">
                <i className=' fas fa-cart-shopping fs-4 '></i>
                <span className='w-[25px] h-[25px] p-2 absolute bottom-4 left-4 bg-green-700 rounded-full flex justify-center items-center text-white'>
                {data?.numOfCartItems?data?.numOfCartItems:0}
                </span>
                </li>
              </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
// 