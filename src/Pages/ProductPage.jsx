import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../services/api';

const Product = () => {
  const { barcode } = useParams();
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await getProductDetail(barcode);
      setProductInfo(data);
      
    };
    fetchProductDetails();
  }, []);

  return (
    <div className="lg:w-10/12 w-11/12 mx-auto py-10 ">
      

      {productInfo.length > 0 ? (
        <div className="border ">
          {productInfo.map((data) => {
            
            const nutritionalArray = Object.entries(
              data.nutritionalValue || {}
            ).map(([key, value]) => ({ key, value }));

            const label =
              data.labels.length > 0
                ? data.labels.map((item) => item.split(':')[1]).join(', ')
                : 'Not Available';
            

            const ingredient =
              data.ingredients.length > 0
                ? data.ingredients.map((item) => item.split(':')[1]).join(', ')
                : 'Not Available';

            
            return (
              <div
                key={data.id}
                className=" my-8   flex flex-col sm:flex-row justify-evenly gap-16 mx-auto"
              >
                <div className="  shadow-2xl rounded-md px-14 py-10">
                  <img
                    src={data.image}
                    alt="product-img"
                    className="lg:min-h-[350px] lg:min-w-[250px] sm:min-h-[300px] sm:min-w-[200px] h-[200px] "
                  />
                </div>

                <div className=" flex flex-col space-y-6 ">
                  <p className="text-3xl text-maroon font-semibold">
                    {data.brandName}
                  </p>
                  <p className="text-5xl font-semibold">{data.name}</p>

                  <div>
                    <span className="font-semibold text-xl">Quantity:</span>{' '}
                    <span>{data.quantity}</span>
                  </div>
                  <div>
                    <span className="text-xl font-semibold">Grade:</span>{' '}
                    <span>{data.grade.toUpperCase()}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-xl">Labels: </span>
                    <span>{label}.</span>
                  </div>

                  <div>
                    <span className="font-semibold text-xl">Ingredients: </span>
                    <span>{ingredient}.</span>
                  </div>

                  <div className="flex  lg:flex-row space-x-1 lg:space-x-3">
                    <p className="font-semibold lg:text-xl text:lg">
                      Nutritional Values:{' '}
                    </p>
                    <div className='flex space-x-2'> {nutritionalArray.length > 0 ? (
                      nutritionalArray.map((item, index) => (
                        <p key={index}>
                          {item.key}: {item.value}
                        </p>
                      ))
                    ) : (
                      <p>No nutritional information available</p>
                    )}</div>
                   
                  </div>

                  <button className="bg-maroon px-4 py-2 rounded-lg w-fit text-white text-lg foont-semibold ">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='grid h-[70vh] place-items-center text-5xl  '> <div className='loader'></div></div>
      )}
    </div>
  );
};

export default Product;
