import foodAPI from "../../apis/foodAPI";
// import { ActionTypes } from "../constants/action-types";
import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL } from '../constants/categoryConstants'


let headers = {
    headers: {
       "Content-Type": "application/json",
       'Warehouse-Id' : "1",
       'Api-Key': "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545"
    }
}
export const fetchCategories = () => async (dispatch) => {
   try {
      dispatch({ type: FETCH_CATEGORIES_REQUEST });
  
      const response = await foodAPI.get("/api/v4/category", headers);
  
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_CATEGORIES_FAIL,
        payload: error
      });
    }
 };

// export const fetchCategories = () => async (dispatch) => {
//   const response = await foodAPI.get("/api/v4/category", headers);
//   dispatch({ type: ActionTypes.FETCH_CATEGORIES, payload: response.data.data });
// };



