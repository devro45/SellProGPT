import { createSlice } from "@reduxjs/toolkit";
const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: true,
    ProductResults: null,
    productName: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptProductResult: (state, action) => {
      const { productName, ProductResults } = action.payload;
      state.ProductResults = ProductResults;
      state.productName = productName;
    },
  },
});
export const { toggleGptSearchView, addGptProductResult } = gptSlice.actions;
export default gptSlice.reducer;
