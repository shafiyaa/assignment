import React, { useEffect, useState } from 'react';
import { categories } from '../../constant';
import { getProductsByCategory } from '../../services/api';
import { useDispatch } from 'react-redux';
import { clearProducts, setFilteredProducts } from '../../redux/slices/productSlice';

const Category = ({setLoading}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  function handleCategory(category) {
  console.log(category.label,category.value)
    setSelectedCategory(category.label);
    fetchCategoryProducts(category.value);
  }

  const fetchCategoryProducts = async (value) => {
    setLoading(true)
    dispatch(clearProducts())
    try {
      const result = await getProductsByCategory(value);
      console.log("category result ", result)
      dispatch(setFilteredProducts(result));
    } catch (error) {
      setLoading(false)
      console.log('error if fetchCategoryProducts', error);
    }
    setLoading(false)
  };

  
  return (
    <div className=" divide-y-2 divide-oak">
      <p className="sm:text-xl text-lg font-bold uppercase">Categories</p>
      <div>
        {categories.map((category, index) => (
          <label
            key={index}
            className=" py-1 sm:text-lg text-base flex space-x-1 items-center cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={category.value}
              className="hidden"
              onChange={() => handleCategory(category)}
            />
            <span
              className={`${
                selectedCategory === category.label ? 'text-maroon sm:text-2xl text-lg' : ''
              }`}
            >
              {category.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Category;
