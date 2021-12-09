import { combineReducers } from "redux";
import { allCartReducer } from "./allCartReducers";
import {  cartReducer } from "./cartReducers";
import { categoriesReducer } from "./categoriesReducer";
import { productListReducer, productDetailsReducer, getAllProductsReducer } from "./productReducers";
import { userDetailsReducer } from "./userReducers";
const reducers = combineReducers({
  allCategories: categoriesReducer,
  allHome: productListReducer,
  productDetails: productDetailsReducer,
  cartItem: cartReducer,
  allCart: allCartReducer,
  allProducts: getAllProductsReducer,
  userDetails: userDetailsReducer
  // allCartItems: allCartItemsReducer,
  // cartItem: cartReducer
});
export default reducers;
