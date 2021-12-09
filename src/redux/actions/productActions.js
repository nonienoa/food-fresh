import foodAPI from "../../apis/foodAPI";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  REMOVE_SELECTED_PRODUCT,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_REQUEST
} from '../constants/productConstants'

const headers  = {
    headers: {
      "Content-Type": "application/json",
      'Warehouse-Id' : "1",
      'Api-Key': "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545"
  }
}
export const listProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const response= await foodAPI.get('/api/v4/newhome', headers)

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error
        // error.response && error.response.data.message
        //   ? error.response.data.message
        //   : error.message,
    })
  }
}

export const listProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const response = await foodAPI.get(`/api/v4/product/${id}`, headers)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: response.data.data,
    })
    console.log(response)
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error
        // error.response && error.response.data.message
        //   ? error.response.data.message
        //   : error.message,
    })
  }
}

export const removeSelectedProduct = () => {
  return {
    type: REMOVE_SELECTED_PRODUCT,
  };
};

export const getAllProducts = () => async dispatch => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST })

    const response= await foodAPI.get('/api/v4/product', headers)

    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload: error
    })
  }
}