import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../ProductCard';
import { setProducts } from '../../redux/slices/productSlice';

const Products = ({ setLoading }) => {
  

  const productData =
    useSelector((state) => state.products.filteredProducts) || [];
  const dispatch = useDispatch();
  const [displayProducts, setDisplayProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await getProducts(dispatch);

      dispatch(setProducts(result));
    } catch (error) {
      // setLoading(false)
      console.log('error is fetchPrducts', error);
    }
    setLoading(false);
  };

  useEffect(() => {
   
    if (!productData.length) {
      fetchProducts(); 
    }
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (productData.length) {
      setDisplayProducts(productData.slice(0, 9 * page));
    }
  }, [productData, page]);

  return (
    <div className=" w-full pl-3">
      <div></div>
      <p className="sm:text-3xl text-xl uppercase py-4">Products</p>
      <div className="sm:h-[80vh] sm:overflow-y-scroll">
        {productData.length > 0 ? (
          <div className="flex flex-col space-y-10 items-center">
            {/* Product Card */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2  2xl:gap-16 md:gap-10  gap-10">
              {displayProducts.map((product) => (
                <ProductCard data={product} key={product.id} />
              ))}
            </div>

            {/* Load More */}
            {productData.length !== displayProducts.length && (
              <div
                className="text-[22px] border bg-maroon text-white py-2 px-4 rounded-md cursor-pointer"
                onClick={handleLoadMore}
              >
                Load More
              </div>
            )}
          </div>
        ) : (
          <div className="text-4xl grid place-items-center h-[300px]">
            No Product Found
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Products;
