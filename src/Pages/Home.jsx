import React, { useEffect, useState } from 'react';

import Category from '../components/HomeCompo/Category';

import Header from '../components/HomeCompo/Header';
import Sort from '../components/HomeCompo/Sort';
import Products from '../components/HomeCompo/Products';

const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className='pb-8'>
      <Header></Header>

      <div className="flex  pt-12  px-16 ">
        <div className="sm:w-[25%]  w-[20%]   ">
          <Category setLoading={setLoading}></Category>
        </div>

        

        <div className=" flex flex-col sm:space-x-10 space-x-6  w-full">
          <div className="flex justify-end   ">
            <Sort></Sort>
          </div>
          {loading ? (
            <div className="sm:text-4xl text-base pl-1 grid place-items-center  h-[300px]  ">
              <div className="loader"></div>
            </div>
          ) : (
            <Products setLoading={setLoading} ></Products>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
