import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
  const { image, name, nutritionGrade, category, ingredients, id, barcode } =
    data;

 

  const categoryList = category.split(',')[0].slice(0, 25);
  const ingredientList = ingredients.split(',').slice(0, 6).join(',');

  return (
    <Link to={`/productpage/${barcode}`} className="">
      {' '}
      <div className="shadow-2xl hover:shadow-oak border  pb-2 hover:border-maroon min-h-[400px] overflow-hidden  ">
        <div className="flex justify-center items-center pt-2">
          {image === 'No image available' ? (
            <div className="md:w-[150px] md:h-[160px] w-[120px] h-[140px] flex justify-center items-center flex-wrap">
              {image}
            </div>
          ) : (
            <img
              src={image}
              loading="lazy"
              alt="Product-Img"
              className="md:w-[150px] md:h-[160px] w-[120px] h-[140px]  "
            />
          )}
        </div>

        <p className="sm:text-lg text-base py-1 px-3 font-semibold  ">{name}</p>
        <div className="flex flex-col space-y-2 px-3">
          <p>
            {' '}
            <span className="font-semibold">Grade:</span>{' '}
            <span className="uppercase">{nutritionGrade}</span>
          </p>
          <p>
            {' '}
            <span className="font-semibold">Category:</span> {categoryList}
          </p>
          <p>
            {' '}
            <span className="font-semibold">Ingredients:</span> {ingredientList}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
