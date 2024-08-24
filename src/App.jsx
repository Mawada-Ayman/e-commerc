// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from "./Layout";
// import Home from "./HOME/Home";
// import Categores from "./Categores";
// import Login from "./Login";
// import Brands from "./Brands";
// import Card from "./Card";
// import Products from "./Products";
// import Notfound from "./Notfound";
// import Rigistar from "./Rigistar";
// import CounterContextProvider from "./context/CounterContext";
// import UserContextProvider from "./context/UserContext";
// import ProtectedRout from "./ProtectedRout";
// import ProductDetails from "./HOME/ProductDetails";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ToastContainer } from "react-toastify";
// import DetailsCheck from "./DetailsCheck";
// import Forget from "./Forget";
// import ResetCode from "./ResetCode";

// let query = new QueryClient()

// export default function App() { 

//   let routes = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         { index: true, element:  <ProtectedRout><Home/></ProtectedRout> },
//         { path: "/categores", element:<ProtectedRout><Categores/></ProtectedRout>  },
//         { path: "/brands", element: <ProtectedRout><Brands/></ProtectedRout> },
//         { path: "/card", element: <ProtectedRout><Card/></ProtectedRout> },
//         { path: "/product", element: <ProtectedRout><Products/></ProtectedRout> },
//         { path: "/productdetails/:id", element: <ProtectedRout><ProductDetails/></ProtectedRout> },
//         { path: "/detailscheck", element:<DetailsCheck/>  },
//         { path: "/login", element:<Login/>  },
//         { path: "/forget", element:<Forget/>  },
//         { path: "/ResetCode", element:<ResetCode/>  },
//         { path: "/rigistar", element: <Rigistar/> },
//         { path: "*", element: <Notfound/> },
//       ],
//     },
//   ]);

//   return (
//     <>
//     <QueryClientProvider client={query }>
//     <UserContextProvider>
//         <CounterContextProvider>
//           <RouterProvider router={routes}></RouterProvider>
//           <ReactQueryDevtools/>
//           <ToastContainer autoClose={500}/>
//         </CounterContextProvider>
//       </UserContextProvider>
//     </QueryClientProvider>

//     </>
//   );
// }


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./HOME/Home";
import Categores from "./Categores";
import Login from "./Login";
import Brands from "./Brands";
import Card from "./Card";
import Products from "./Products";
import Notfound from "./Notfound";
import Rigistar from "./Rigistar";
import CounterContextProvider from "./context/CounterContext";
import UserContextProvider from "./context/UserContext";
import ProtectedRout from "./ProtectedRout";
import ProductDetails from "./HOME/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import DetailsCheck from "./DetailsCheck";
import Forget from "./Forget";
import ResetCode from "./ResetCode";
import Favorites from "./HOME/Favorites";
import { useState } from "react";
import NewPassword from "./NewPassword";
import Orders from "./Orders";

let query = new QueryClient()

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = (product) => {
    setFavorites([...favorites, product]);
  };

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRout><Home onAddToFavorites={handleAddToFavorites} /></ProtectedRout> },
        { path: "/categores", element: <ProtectedRout><Categores /></ProtectedRout> },
        { path: "/brands", element: <ProtectedRout><Brands /></ProtectedRout> },
        { path: "/card", element: <ProtectedRout><Card /></ProtectedRout> },
        { path: "/product", element: <ProtectedRout><Products /></ProtectedRout> },
        { path: "/favorits", element: <ProtectedRout><Favorites  products={favorites} /></ProtectedRout> },
        { path: "/productdetails/:id", element: <ProtectedRout><ProductDetails /></ProtectedRout> },
        { path: "/detailscheck", element: <DetailsCheck /> },
        { path: "/allorders", element: <Orders /> },
        { path: "/login", element: <Login /> },
        { path: "/forget", element: <Forget /> },
        { path: "/resetCode", element: <ResetCode /> },
        { path: "/newpassword", element: <NewPassword /> },
        { path: "/rigistar", element: <Rigistar /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <CounterContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <ReactQueryDevtools />
            <ToastContainer autoClose={500} />
          </CounterContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}
