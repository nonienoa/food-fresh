import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export const addToCart = (evt, prodId, accessToken) => {
  evt.preventDefault();
  // const [cookies, removeCookie] = useCookies();

  
  console.log("Accesstoken", accessToken)
  if (accessToken && accessToken !== 'undefined') {
    let cartData;
    const url = "https://uat.ordering-boafresh.ekbana.net//api/v4/cart";
    const headers = {
      method: "GET",
      headers: {
        "Api-key":
          "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
        Authorization: "Bearer " + accessToken,
        "Warehouse-Id": "1",
      },
    };
    const fetchCart = async () => {
      try {
        const resp = await fetch(url, headers);
        const json = await resp.json();
        cartData = json.data.cartProducts;
        if (cartData.some((item) => item.product.id === prodId)) {
          const cartProdId = cartData.find(
            (cartProd) => cartProd.product.id === prodId
          );
          const prodQuantity = cartProdId.quantity;
          updateCart(cartProdId.id, prodQuantity + 1, accessToken);
        } else {
          addNew(prodId, accessToken);
        }
      } catch (err) {
        toast.error(err);
      }
    };

    fetchCart();
  } else {
    toast.info('Please login to add to cart!')
  }
};

export const addNew = (prodId, accessToken) => {
  const url = "https://uat.ordering-boafresh.ekbana.net//api/v4/cart-product";
  const headers = {
    method: "POST",
    headers: {
      "Api-key":
        "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
      Authorization: "Bearer " + accessToken,
      "Warehouse-Id": "1",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: prodId,
      priceId: prodId,
      quantity: "1",
      note: "test",
    }),
  };
  const addProduct = async () => {
    try {
      const resp = await fetch(url, headers);
      const json = await resp.json();
      if (resp.status === 200) {
        toast.success("Item added to cart!");
        return resp.status;
      } else {
        throw json.errors[0].message;
      }
    } catch (err) {
      toast.error(err)
    }
  };

  addProduct();
};

export const updateCart = (cartProdId, quantity, accessToken) => {
  const url =
    "https://uat.ordering-boafresh.ekbana.net//api/v4/cart-product/" +
    cartProdId;
  const headers = {
    method: "PATCH",
    headers: {
      "Api-key":
        "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
      Authorization: "Bearer " + accessToken,
      "Warehouse-Id": "1",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  };
  const updateProduct = async () => {
    try {
      const resp = await fetch(url, headers);
      const json = await resp.json();
      if (resp.status === 200) {
        toast.success("Cart has been updated");
        
        return resp.status;
      } else {
        throw json.errors[0].message;
      }
    } catch (err) {
      toast.error(err)
    }
  };

  updateProduct();
};



// export const addToCart = (e, productID) => {
//     e.preventDefault();
//     console.log("dsdsfdsdf", productID)
    
//     if (accessToken && accessToken !== 'undefined') {
//       let cartData;
//       const url = "https://uat.ordering-boafresh.ekbana.net//api/v4/cart";
//       const headers = {
//         method: "GET",
//         headers: {
//           "Api-key":
//             "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
//           Authorization: "Bearer " + accessToken,
//           "Warehouse-Id": "1",
//         },
//       };
//       const fetchCart = async () => {
//         try {
//           const response = await fetch(url, headers);
//           cartData = response.data.data;
//           if (cartData.some((item) => item.product.id ===  productID)) {
//             const cartProduct = cartData.find(
//               (cartProd) => cartProd.product.id ===  productID
//             );
//             const productQuantity = cartProduct.quantity;
//             // console.log("Already exists" + cartProduct.id);
//             updateCart(cartProduct.id, productQuantity + 1, accessToken);
//           } else {
//             addNewItemToCart( productID, accessToken);
//           }
//         } catch (err) {
//           toast.error(err)
//           // console.log("error", err);
//         }
//       };
  
//       fetchCart();
//     } else {
//       toast.info('wrong')
//       // toast.info('Log in to add to cart.')
//       // history.push("/login");
//     }
//   };
  
//   export const addNewItemToCart = (productID, accessToken) => {
//     const url = "https://uat.ordering-boafresh.ekbana.net//api/v4/cart-product";
//     const headers = {
//       method: "POST",
//       headers: {
//         "Api-key":
//           "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
//         Authorization: "Bearer " + accessToken,
//         "Warehouse-Id": "1",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         productId: productID,
//         priceId: productID,
//         quantity: "1",
//         note: "",
//       }),
//     };
//     const addProduct = async () => {
//       try {
//         const response = await fetch(url, headers);
//         const json = await response.json();
//         if (response.status === 200) {
//           // alert("Item added to cart!");
//           const result = await response.data.data;
//           toast.success('Added to cart!')
//           return response.status;
//         } else {
//            toast.error(json.errors[0].message);
//         }
//       } catch (err) {
//         console.log("error", err);
//         toast.error(err)
//       }
//     };
  
//     addProduct();
//   };
  
//   export const updateCart = (cartProdId, quantity, accessToken) => {
//     const url =
//       `https://uat.ordering-boafresh.ekbana.net//api/v4/cart-product/${cartProdId}`
      
//     const headers = {
//       method: "PATCH",
//       headers: {
//         "Api-key":
//           "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
//         Authorization: "Bearer " + accessToken,
//         "Warehouse-Id": "1",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         quantity: quantity,
//       }),
//     };
//     const updateProduct = async () => {
//       try {
//         const resp = await fetch(url, headers);
//         const json = await resp.json();
//         if (resp.status === 200) {
//           alert("Item added to cart!");
//           const data = await json.data;
//           return resp.status;
//         } else {
//           // throw json.errors[0].message;
//           toast.error(json.errors[0].message)
//         }
//       } catch (err) {
//         // console.log("error", err);
//         toast.error(err)
//       }
//     };
  
//     updateProduct();
//   };
  
  