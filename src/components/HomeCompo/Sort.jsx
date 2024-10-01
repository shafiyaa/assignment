import React, { useState } from 'react';
import { sortOptions } from '../../constant';
import { FaAngleDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/slices/productSlice';

const Sort = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.products) || [];

  const handleProductSort = (label, value) => {
    setSelectedOption(label)
    let sortedProducts = [];

    if (value === 'name-asc') {
      sortedProducts = [...productData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (value === 'name-desc') {
      sortedProducts = [...productData].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else if (value === 'nutrition-asc') {
      sortedProducts = [...productData].sort((a, b) =>
        a.nutritionGrade.localeCompare(b.nutritionGrade)
      );
    } else if (value === 'nutrition-desc') {
      sortedProducts = [...productData].sort((a, b) =>
        b.nutritionGrade.localeCompare(a.nutritionGrade)
      );
    } else {
      sortedProducts = productData;
    }
    dispatch(setProducts(sortedProducts));
  };
  return (
    <div className="relative ">
      <div className="flex items-center space-x-2 sm:text-xl text-lg">
        <p>
          Sort: <span className='hidden sm:block'>{selectedOption}</span>
        </p>
        <FaAngleDown
          onClick={() => setOpen(!open)}
          className={` ${
            open ? 'rotate-180' : 'rotate-0'
          } transition duration-200 ease-linear`}
        />
      </div>

      <div
        className={`${
          open
            ? 'h-fit opacity-100 duration-300'
            : 'h-0 border-0 opacity-0 duration-0'
        } absolute right-0 z-20   transition  ease-in-out border-2 border-maroon  py-6 rounded-md mt-4  bg-white sm:w-[200px] w-[160px]`}
      >
        {sortOptions.map((sort, index) => (
          <p
            key={index}
            className="cursor-pointer py-1 px-1 hover:text-maroon sm:text-[17px] text-[15px]"
            onClick={() => handleProductSort(sort.label, sort.value)}
          >
            {sort.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sort;
