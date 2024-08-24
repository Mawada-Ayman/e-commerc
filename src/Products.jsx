import { useEffect } from "react";
import RecentProduct from "./HOME/RecentProduct";

export default function Products() {

  useEffect(() => {
    document.title = 'Products Page';
  }, []);

  return (
    <RecentProduct/>
  )
}
