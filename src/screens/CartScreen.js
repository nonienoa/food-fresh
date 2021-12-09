import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { Form, Select } from './ProductDetailsScreen'
import Message from '../components/Message'
import CustomLoader from '../components/CustomLoader'
// import { InputForm, ValueButton, ValueInput } from './cartScreen.styled'
import { fetchAllCart } from '../redux/actions/allCartActions'
import { toast } from 'react-toastify'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Cart = styled.div`
  margin: 10rem auto;
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  color: var(--white);
  background-color: var(--primary);
  font-weight: normal;
`

const Td = styled.td`
  padding: 1rem 0.5rem;

  img {
    width: 8rem;
    height: 8rem;
    margin-right: 1rem;
  }

  &.total {
    font-weight: 700;
  }
`

const CartInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Title = styled.p`
  @media (max-width: 576px) {
    display: none;
  }
`

const LinkWrapper = styled(Link)`
  color: var(--primary);
  font-size: 1.8rem;
`

const TotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  flex-direction: column;
  margin-top: 2rem;

  div {
    margin-left: auto;
  }
`

const TotalTable = styled.table`
  border-top: 3px solid var(--primary);
  width: 100%;
  max-width: 35rem;
`

const TotalLink = styled.button`
  display: inline-block;
  background-color: var(--primary);
  color: var(--white);
  padding: 1.3rem 2rem;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 3rem;
  outline: none;
  border: none;
  cursor: pointer;
`
const QuantityButton = styled.button`
  padding: 5px;
  margin: 2px;
`
const PriceSpan = styled.span`
  font-size: 1.5rem;
`

const CartScreen = ({ match, location, history }) => {
  useDocumentTitle(`BoaFresh | Cart`)
    
  const [cookies, removeCookie] = useCookies();
  let accessToken = cookies.access_token;

  // const loading = false;
  const length = 1

  const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(fetchAllCart(accessToken))
  }, [])
  
  const cartData = useSelector(state => state.allCart)
  const { cartItems , isLoaded } = cartData
  console.log(cartItems)

  const updateCart = async (cartProductID, updatedQuantity) => {
    await fetch(`https://uat.ordering-boafresh.ekbana.net/api/v4/cart-product/${cartProductID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        "Api-key":
          "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
        'Warehouse-Id': '1',
      },
      body: JSON.stringify({
        quantity: updatedQuantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          toast.success('Cart has been updated');
          dispatch(fetchAllCart(accessToken))
        } else {
          toast.error(`Cart couldn't be updated. Please try again.`);
        }
      })
      .catch((error) => toast.error(error));
  };

  const removeItem = async (cartProductID) => {
    await fetch(`https://uat.ordering-boafresh.ekbana.net/api/v4/cart-product/${cartProductID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Api-key":
          "fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545",
        'Warehouse-Id': '1',
        cartProductId: cartProductID,
      },
    })
      .then(() => {
        dispatch(fetchAllCart(accessToken))
        toast.error('Item has been deleted from cart')
      })
      .catch((error) => toast.error(error));
  };

  return (
    <>
      {(isLoaded && cartItems.cartProducts.length === 0 ) ? (
        <Message type='warning' message='Your Cart is Empty' />
      ) : !isLoaded ? (
        <CustomLoader type='Oval' width={40} height={40} />
      ) : (
        <Cart className='container'>
          <Table>
            <thead>
              <tr>
                <Th>Product</Th>
                <Th>Unit Price</Th>
                <Th>Quantity</Th>
                <Th>Remove</Th>
                <Th>Subtotal</Th>
              </tr>
            </thead>
            <tbody>
              {cartItems.cartProducts.map(item => (
                <tr key={item.id}>
                  <Td>
                    <CartInfo>
                      <Link to={`/product-details/${item.product.slug}`}>
                        <img src={item.product.images[0].imageName} alt={item.title} />
                      </Link>
                      <div>
                      <LinkWrapper
                          to={`/product-details/${item.product.slug}`}
                          
                        >
                          {item.product.title}
                        </LinkWrapper>
                        <br/>
                        <PriceSpan>Price: Rs. {item.selectedUnit.sellingPrice}</PriceSpan>
                        <br />
                        
                      </div>
                    </CartInfo>
                  </Td>
                  <Td>
                     Rs. {item.selectedUnit.sellingPrice}
                  </Td>
                  <Td>
                    <div className="quantity">
                      <QuantityButton id="decrease" onClick={() => {
                        item.quantity > 1 ? (
                          updateCart(item.id, item.quantity - 1)
                        ) : (
                          removeItem(item.id)
                        )
                      }}>
                      
                        -
                      </QuantityButton>
                      <span className="quantity-span">{item.quantity}</span>
                      <QuantityButton id="increase" onClick={() => (
                          updateCart(item.id, item.quantity + 1)
                      )}>
                          
                        +
                      </QuantityButton>
                    </div>
                    
                  </Td>
                  <Td>
                    <button id="delete-item" onClick={(e) => removeItem(item.id)}>x</button>
                  </Td>
                  <Td>Rs. {item.selectedUnit.sellingPrice * item.quantity}</Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <TotalPrice>
            <div>
              {' '}
              <TotalTable>
                <tbody>
                  <tr>
                    <Td>
                      Subtotal 
                      
                      ({cartItems.cartProducts.length})
                      
                    </Td>
                    <Td>
                      Rs. {cartItems.subTotal}
                      {/* {cartItems
                        .reduce((acc, item) => acc + item.quantity * (item.selectedUnit.sellingPrice), 0)
                        .toFixed(2)} */}
                    </Td>
                  </tr>
                  <tr>
                    <Td>Delivery Charge</Td>
                    <Td>Rs. {cartItems.deliveryCharge}</Td>
                  </tr>
                  <tr>
                    <Td>Total</Td>
                    <Td className='total'>
                      Rs. 
                      {cartItems.total}
                    </Td>
                  </tr>
                </tbody>
              </TotalTable>
              <TotalLink
                type='button'
                disabled={cartItems.cartProducts.length === 0}
              >
                Proceed To Checkout
              </TotalLink>
            </div>
          </TotalPrice>
        </Cart>
      )}
    </>
  )
}

export default CartScreen

 

  