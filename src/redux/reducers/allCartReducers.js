// import { ActionTypes } from "../constants/action-types";
import {
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    GET_ALL_CART_ITEMS_FAIL
  } from "../constants/cartConstants";
  
const intialState = {
  cartItems: [],
};


export const allCartReducer = (state = {intialState, isLoaded: false}, { type, payload }) => {
  switch (type) {
    case GET_ALL_CART_ITEMS_REQUEST:
      return { isLoaded: false, cartItems: [] };
    case GET_ALL_CART_ITEMS_SUCCESS:
      return {
        isLoaded: true, cartItems: payload
      };
    case GET_ALL_CART_ITEMS_FAIL:
      return { isLoaded: true, error: payload };
    default:
      return state;
  }
};
