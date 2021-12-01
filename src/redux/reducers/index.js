import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { productListReducer, productDetailsReducer } from "./productReducers";
const reducers = combineReducers({
  allCategories: categoriesReducer,
  allHome: productListReducer,
  productDetails: productDetailsReducer
});
export default reducers;
