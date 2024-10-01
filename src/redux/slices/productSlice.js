import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts:[]
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
       
    },
    clearProducts :(state)=>{
      console.log("clear Product is called")
      state.filteredProducts = []
    }
  },
});

export default productSlice.reducer;
export const { setProducts,setFilteredProducts,clearProducts } = productSlice.actions;
