// import { ActionTypes } from "../constants/action-types";
import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL } from '../constants/categoryConstants'

const intialState = {
  categories: [],
};


export const categoriesReducer = (state = {intialState, isLoaded: false}, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES_REQUEST:
      return { isLoaded: false, categories: [] };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        isLoaded: true, categories: payload
      };
    case FETCH_CATEGORIES_FAIL:
      return { isLoaded: true, error: payload };
    default:
      return state;
  }
};
