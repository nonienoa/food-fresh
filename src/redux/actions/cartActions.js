import foodAPI from '../../apis/foodAPI'
import {axios} from 'axios'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  UPDATE_CART_ITEM
} from '../constants/cartConstants'

// export const addToCart = (id, qty) => async (dispatch, getState) => {
//   const { data } = await axios.get(`/api/products/${id}`)

//   dispatch({
//     type: CART_ADD_ITEM,
//     payload: {
//       product: data.data.product._id,
//       name: data.data.product.name,
//       image: data.data.product.image,
//       price: data.data.product.price,
//       countInStock: data.data.product.countInStock,
//       qty,
//     },
//   })

//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }

// export const getAllCartItems = (accessToken) => async dispatch => {
//   // const [ cookies] = useCookies()
//   // let accessToken = cookies.access_token;
//   // console.log("yeta", accessToken)
//   try {
//     dispatch({ type: GET_ALL_CART_ITEM_REQUEST });
//     const response = await foodAPI.get({
//       headers: {
//         'Content-Type': 'application/json',
//         'Warehouse-Id': '1',
//         Authorization:
//           'Bearer' + accessToken,
//         'Api-key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
        
//       }
//     });
//     dispatch({
//       type: GET_ALL_CART_ITEM_SUCCESS,
//       payload: {
//         checkOutId: response.data.data.id,
//         cartNumber: response.data.data.cartNumber,
//         orderAmout: response.data.data.orderAmount,
//         discount: response.data.data.discount,
//         subTotal: response.data.data.subTotal,
//         deliveryCharge: response.data.data.deliveryCharge,
//         pickupTotal: response.data.data.pickupTotal,
//         total: response.data.data.total,
//         cartItems: response.data.data.cartProducts
//       }
//     });
//   } catch (error) {
//     dispatch({ type: GET_ALL_CART_ITEM_FAIL, payload: error });
//   }
// };

// export const AllCartItem = () => async dispatch => {
//   const url = 'https://uat.ordering-boafresh.ekbana.net/api/v4/cart';
//   try {
//     dispatch({ type: GET_ALL_CART_ITEM_REQUEST });
//     const response = await axios.get(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Warehouse-Id': '1',
//         'Api-key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
//         Authorization:
//         'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI5MTk5M2E3YWZlZDZmNjhhOTRkMTRhNWZlMTAwOGNmOWI1ZDMxNTM0MjcxZjk0ZjE3NDU2ZDVhMGRjNTM4ODZlMWIyNzEwZGE0YWViYjYwIn0.eyJhdWQiOiIyIiwianRpIjoiYjkxOTkzYTdhZmVkNmY2OGE5NGQxNGE1ZmUxMDA4Y2Y5YjVkMzE1MzQyNzFmOTRmMTc0NTZkNWEwZGM1Mzg4NmUxYjI3MTBkYTRhZWJiNjAiLCJpYXQiOjE2Mzg0MzA0MTQsIm5iZiI6MTYzODQzMDQxNCwiZXhwIjoxNjM5Mjk0NDE0LCJzdWIiOiIyMzMiLCJzY29wZXMiOltdfQ.cOMYtaN7tbUEGSoLHC2pHW0Q2Ph-GNF1ClJebDfuIY6viuVLNVe1ZGZKHQLIsxeLEdaB1ARQf9sM0q-X2wTs4pHMAVj8z39EBgZRrdYuHpFXhC1Gq8LrnviKFRVxgHVm05oXEG2fdEIuIJUuBYmJ1EtDLfNaWzBuBwdIaU4n4fqwedVt70namJyKhn2nTVplpvE-Qqefg4psYo32FgJQG-f-cIC7lkfxH-NFRZ58jT4Qr3azN5fPQM7OKjSZa4nXytoUr-mb_oy5lX7geh7wdr6oLDA2Wl4FK046gNZJKY9sTu2hY6-eOlbhazFXsieyQg_rU-OHRI7VtTULSfs7I2_7wwTrP-50O4y9J6giEXxAqZAqd8Y2kVJdjgPxLGz_YrSV8Css9l_VdH8f7-vbvYQZMMfHAceYC5YsuBc4SfS5X3ag4hAlLV_oItuYR-I5MDK_QqbE1N9fuimXqoJKJkWgcgKxg_CS-C5IS0DUgtM9zZHFsWOnuqjEySiIgV8oJ77wr686ApA5rlZh96iggT6PHAJGmUkBt4JWq2Iak-TNCAvSmz_ytAJmztuivBjjoRUdmENxSjQRDWDHgOkFfP4zSwCe7pI2zly0uRx2L5L2YrWnSKD5H8KR3qwevyvuDeq1rNjHbGxdVnCdOQPAGDGJrx7Gw-EXM59-66hroXc'
//       }
//     });
//     dispatch({
//       type: GET_ALL_CART_ITEM_SUCCESS,
//       payload: {
//         checkOutId: response.data.data.id,
//         cartNumber: response.data.data.cartNumber,
//         orderAmout: response.data.data.orderAmount,
//         discount: response.data.data.discount,
//         subTotal: response.data.data.subTotal,
//         deliveryCharge: response.data.data.deliveryCharge,
//         pickupTotal: response.data.data.pickupTotal,
//         total: response.data.data.total,
//         cartItems: response.data.data.cartProducts
//       }
//     });
//   } catch (error) {
//     toast.error(error)
//     dispatch({ type: GET_ALL_CART_ITEM_FAIL, payload: error });
//   }
// };

export const removeFromCart = (id, accessToken) => async (dispatch, getState) => {
    // const [ cookies] = useCookies()
    // let accessToken = cookies.access_token;

    const response = await foodAPI.delete(`/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Warehouse-Id': '1',
        Authorization: "Bearer " + accessToken,
        'Api-key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545'
      }
    });

    console.log("Response data", response.data)
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        deletedProductId: id,
        code: response.data
      }
    });

  toast.error('Removed from Cart')

  // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCartItem = (id, quantity, accessToken) => async (dispatch, getState) => {
  // const [ cookies] = useCookies()
  //   let accessToken = cookies.access_token;
  const bodyData = {
    quantity: `${quantity}`
  };
  const response = await foodAPI.patch(`/${id}`, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      'Warehouse-Id': '1',
      Authorization:
        'Bearer' + accessToken,
        'Api-key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545'
    }
  });
  dispatch({
    type: UPDATE_CART_ITEM,
    payload: {
      cartId: response.data.data.id,
      totalPrice: response.data.data.price,
      quantity: response.data.data.quantity,
      unitPrice: response.data.data.selectedUnit.markedPrice,
      stock: response.data.data.selectedUnit.stock,
      productId: response.data.data.product.id,
      title: response.data.data.product.title,
      imageName: response.data.data.product.images[0].imageName
    }
  });
  // localStorage.setItem('cartItems', JSON.stringify(getState().cartItem.cartItems));
};





// export const saveShippingAddress = data => async dispatch => {
//   dispatch({
//     type: CART_SAVE_SHIPPING_ADDRESS,
//     payload: data,
//   })

//   localStorage.setItem('shippingAddress', JSON.stringify(data))
// }

// export const savePaymentMethod = data => async dispatch => {
//   dispatch({
//     type: CART_SAVE_PAYMENT_METHOD,
//     payload: data,
//   })

//   localStorage.setItem('paymentMethod', JSON.stringify(data))
// }
