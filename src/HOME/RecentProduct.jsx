

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { RiseLoader } from 'react-spinners';
import useProducts from '../Hooks/useProducts';
import addToCartApi from '../APIS/cartApi';
import useMutationCart from '../Hooks/useMutationCart';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function RecentProduct({ onAddToFavorites }) {
  var { status, mutate: addMutate, data } = useMutationCart(addToCartApi);

  if (status === 'success') {
    toast.success(data?.data?.message);
  }

  var { data: productsData, isError, error, isLoading } = useProducts();
  
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleFavoriteClick = (product) => {
    if (favorites.includes(product.id)) {
      setFavorites(favorites.filter(fav => fav !== product.id));
    } else {
      setFavorites([...favorites, product.id]);
      setTimeout(() => {
        onAddToFavorites(product);
      }, 0);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productsData?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-40 w-full'>
        <RiseLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center py-40 w-full'>
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="my-14">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm} 
          onChange={handleSearch} 
          className="form-control"
        />
      </div>
      <div className="row">
        {filteredProducts?.map((product) =>
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-6">
            <div className="product py-4 px-2">
              <Link to={`/productdetails/${product.id}`}>
                <img className="w-full" src={product.imageCover} alt={product.title} />
                <span className="block font-medium text-green-600">{product.category.name}</span>
                <h2 className="text-lg fw-medium pb-3">{product.title.split(' ').slice(0, 3).join(' ')}</h2>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>{product.ratingsAverage} <i className="fas fa-star text-yellow-400"></i></span>
                </div>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <Button onClick={() => { addMutate(product.id) }} className="w-full" variant="success">+ Add</Button>
                <i
                  className={`fas fa-heart cursor-pointer ${favorites.includes(product.id) ? 'text-red-600' : 'text-gray-400'}`}
                  onClick={() => handleFavoriteClick(product)}
                ></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

