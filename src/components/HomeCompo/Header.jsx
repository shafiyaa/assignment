import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredProducts } from '../../redux/slices/productSlice';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const productData = useSelector((state) => state.products.filteredProducts);
  const allProducts = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const handleSearchItem = () => {
    console.log(searchQuery);
    const isNumber = !isNaN(searchQuery);

    if (searchQuery.trim() === '') {
      dispatch(setFilteredProducts(allProducts));
    } else {
      const filterItems = productData.filter((item) => {
        if (isNumber) {
          return item.barcode.includes(searchQuery);
        } else {
          return item.name
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase());
        }
      });
      console.log(filterItems);
      dispatch(setFilteredProducts(filterItems));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchItem();
  };

  return (
    <div className="bg-maroon  py-10 flex sm:flex-row flex-col  items-center space-y-4  justify-around text-white font-stix">
      <p className="lg:text-3xl sm:text-2xl text-3xl font-semibold italic">Food Explorer</p>
      <div className="flex space-x-2 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className=" lg:w-[500px] sm:w-[300px] rounded-lg  bg-purple-50 text-black px-2 py-2 focus:outline-none"
        />
        <GoSearch
          className="text-2xl cursor-pointer font-bold"
          onClick={handleSearchItem}
        />
      </div>
    </div>
  );
};

export default Header;
