import foodAPI from "../../apis/foodAPI";
import {
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  GET_ALL_CART_ITEMS_FAIL,
} from "../constants/cartConstants";
import {toast } from 'react-toastify'

export const fetchAllCart = (accessToken) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });

    const response = await foodAPI.get("/api/v4/cart",{
        headers: {
            "Content-Type": "application/json",
            "Warehouse-Id": "1",
            "Api-Key":
              "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
            Authorization: "Bearer " + accessToken,
          }
    });

    dispatch({
      type: GET_ALL_CART_ITEMS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CART_ITEMS_FAIL,
      payload: error,
    });
  }
};

export const updateCart = (accessToken) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });

    const response = await foodAPI.get("/api/v4/cart",{
        headers: {
            "Content-Type": "application/json",
            "Warehouse-Id": "1",
            "Api-Key":
              "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
            Authorization: "Bearer " + accessToken,
          }
    });

    dispatch({
      type: GET_ALL_CART_ITEMS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CART_ITEMS_FAIL,
      payload: error,
    });
  }
};

// export const fetchCategories = () => async (dispatch) => {
//   const response = await foodAPI.get("/api/v4/category", headers);
//   dispatch({ type: ActionTypes.FETCH_CATEGORIES, payload: response.data.data });
// };
