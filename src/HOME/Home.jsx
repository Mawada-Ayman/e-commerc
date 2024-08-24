import { useEffect } from "react";
import RecentProduct from "./RecentProduct";
import CategorisSlider from "./CategorisSlider"; 
import MainSlider from "./MainSlider";



export default function Home({ onAddToFavorites }) {
  useEffect(() => {
    document.title = 'Home Page';
  }, []);
  return (
    <>
    <MainSlider/>
    <CategorisSlider/>
    <RecentProduct onAddToFavorites={onAddToFavorites} />
    </>
  )
}
