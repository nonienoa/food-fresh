import { toast } from 'react-toastify'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  UPDATE_CART_ITEM
} from '../constants/cartConstants'

// export const cartItemReducer = (state = { allCartItem: [], loading: true }, { type, payload }) => {
//   switch (type) {
//     case GET_ALL_CART_ITEM_REQUEST:
//       return { allCartItem: [], loading: true };

//     case GET_ALL_CART_ITEM_SUCCESS:
//       return { allCartItem: payload, loading: false };
//     case GET_ALL_CART_ITEM_FAIL:
//       return { error: payload, loading: false };

//     default:
//       return state;
//   }
// };

// export const allCartItemsReducer = (state = { allCartItem: [], loading: true }, { type, payload }) => {
//   switch (type) {
//     case GET_ALL_CART_ITEM_REQUEST:
//       return { allCartItem: [], loading: true };
//     case GET_ALL_CART_ITEM_SUCCESS:
//       return { allCartItem: payload, loading: false };
//     case GET_ALL_CART_ITEM_FAIL:
//       return { error: payload, loading: false };
//     default:
//       return state;
//   }
// };

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    // case CART_ADD_ITEM:
    //   const item = payload

    //   const existItem = state.cartItems.find(x => x.product === item.product)

    //   if (existItem) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.map(x =>
    //         x.product === existItem.product ? item : x
    //       ),
    //     }
    //   } else {
    //     toast.success('Added To Cart')
    //     return {
    //       ...state,
    //       cartItems: [...state.cartItems, item],
    //     }
    //   }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.productId !== payload.deletedProductId),
      }

    case UPDATE_CART_ITEM:
      const cartItem = payload;

      const existCartItem = state.cartItems.find(x => x.cartId === cartItem.cartId);

      if (existCartItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => (x.cartId === existCartItem.cartId ? cartItem : x))
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, cartItem]
        };
      }
    default:
      return state
  }
}


