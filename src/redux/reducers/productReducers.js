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

export const productListReducer = (state = { homeData: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, homeData: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, homeData: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: [] } ,
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case REMOVE_SELECTED_PRODUCT:
      return { }
    default:
      return state
  }
}

export const getAllProductsReducer = (state = { products: [], isLoaded: false}, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return { isLoaded: false, products: [] }
    case GET_ALL_PRODUCTS_SUCCESS:
      return { isLoaded: true, products: action.payload }
    case GET_ALL_PRODUCTS_FAIL:
      return { isLoaded: true, error: action.payload }
    default:
      return state
  }
}