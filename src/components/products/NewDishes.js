import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import adImage from "../../backpack.jpg";
import styled from 'styled-components'
// import './prod.css'
import Title from '../Title'
import { listProducts } from '../../redux/actions/productActions'
import Alert from '../Alert'
import Message from '../Message'
import CustomLoader from '../../components/CustomLoader'
import { toast } from 'react-toastify'
import { addToCart } from '../Functions/cart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faHeart } from '@fortawesome/free-solid-svg-icons';
import './newDishes.css'




const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 3rem;
  padding: 0 1.6rem;
  margin: 0 auto;

`
const ImgContainer = styled.div`
  

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`
const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0.6rem;
  background-color: var(--white);
  border-radius: 50%;
  padding: 1.3rem 1.6rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  transition: all 300ms ease-in-out;

  :hover {
    background-color: var(--primary);
    color: var(--white);
  }

  &.disabled {
    pointer-event: none;
    cursor: default;
  }
`
const SideIconsWrapper = styled.ul`
    position: absolute;
    right: 0;
    top: 30%;
    transform: translate(80%, -50%);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    transition: all 500ms ease-in-out;

    span {
        font-size: 1.4rem;
        background-color: var(--white);
        margin: 0.3rem;
        padding: 1rem 1.3rem;
        border-radius: 50%;
        transition: all 300ms ease-in-out;
      }

      span:hover {
        background-color: var(--primary);
        color: var(--white);
      }
`
const ProductItem = styled.div`
  overflow: hidden;

  i {
    transition: all 300ms ease-in-out;
  }
  ${ImgContainer} {
    position: relative;
    cursor: pointer;
  }

  :hover ${IconWrapper} {
    border-radius: 1rem 0 0 0;
  }
  :hover ${SideIconsWrapper} {
    transform: translate(0%, -50%);
  }
`

const Bottom = styled.div`
  padding: 1rem;
  text-align: center;
`

const ProductLink = styled(Link)`
  margin-bottom: 1rem;
  font-weight: inherit;
  font-size: 1.5rem;

  :hover {
    color: var(--primary);
  }
`

const PriceLabel = styled.span`
  color: var(--primary);
  font-size: 1.8rem;
`

const Price = styled.div``




const NewDishes = () => {
  const [cookies, removeCookie] = useCookies();
  let accessToken = cookies.access_token;
  // console.log("YOhi aa", accessToken)
  const history = useHistory()

  const dispatch = useDispatch()

  const loginToContinue = (e) => {
    toast.info('Login to add to Cart')
    history.push('/login')
  }
  const qty = 1
  
  const cartLoaded = true;

  const mainData = useSelector(state => state.allHome)
  const { loading, error, homeData } = mainData

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  //   if (!loading) {
  //     console.log("loading", loading)
  //     console.log("asa", (homeData[2].sectionDetails.products).map(item => item))
  //     // console.log("asa", homeData)

  // }
  // const addToCartHandler = (id, qty) => {
  //   dispatch(addToCart(id, qty))
  // }

  // const outOfStockHandler = () => {
  //   toast.error('Out of Stock')
  // }

  return (

    <section className='section'>
      <Title
        title= { !loading &&
          homeData &&
          homeData[2] &&
          (homeData[2].sectionDetails).title}
        subtitle='Select from our premium foods and save plenty money'
      />{' '}
      {loading ? (
        <CustomLoader type='Oval' width={40} height={40} />
      ) : error ? (
        <>
          {' '}
          <Alert type='danger' message={error} title='' />{' '}
          <Message type='warning' message={error} />{' '}
        </>
      ) : (
        <div class="product-layout">
        <div class="product">
          <div class="img-container">
            <img src="./images/product1.jpg" alt="" />
            <div class="addCart">
              <i class="fas fa-shopping-cart"></i>
            </div>
  
            <ul class="side-icons">
              <span><i class="fas fa-search"></i></span>
              <span><i class="far fa-heart"></i></span>
              <span><i class="fas fa-sliders-h"></i></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">Bambi Print Mini Backpack</a>
            <div class="price">
              <span>$150</span>
            </div>
          </div>
          </div>
          <div class="product">
          <div class="img-container">
            <img src="./images/product1.jpg" alt="" />
            <div class="addCart">
              <i class="fas fa-shopping-cart"></i>
            </div>
  
            <ul class="side-icons">
              <span><i class="fas fa-search"></i></span>
              <span><i class="far fa-heart"></i></span>
              <span><i class="fas fa-sliders-h"></i></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">Bambi Print Mini Backpack</a>
            <div class="price">
              <span>$150</span>
            </div>
          </div>
          </div>
          <div class="product">
          <div class="img-container">
            <img src="./images/product1.jpg" alt="" />
            <div class="addCart">
              <i class="fas fa-shopping-cart"></i>
            </div>
  
            <ul class="side-icons">
              <span><i class="fas fa-search"></i></span>
              <span><i class="far fa-heart"></i></span>
              <span><i class="fas fa-sliders-h"></i></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">Bambi Print Mini Backpack</a>
            <div class="price">
              <span>$150</span>
            </div>
          </div>
          </div>
          <div class="product">
          <div class="img-container">
            <img src="./images/product1.jpg" alt="" />
            <div class="addCart">
              <i class="fas fa-shopping-cart"></i>
            </div>
  
            <ul class="side-icons">
              <span><i class="fas fa-search"></i></span>
              <span><i class="far fa-heart"></i></span>
              <span><i class="fas fa-sliders-h"></i></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">Bambi Print Mini Backpack</a>
            <div class="price">
              <span>$150</span>
            </div>
          </div>
          </div>
          <div class="product">
          <div class="img-container">
            <img src="./images/product1.jpg" alt="" />
            <div class="addCart">
              <i class="fas fa-shopping-cart"></i>
            </div>
  
            <ul class="side-icons">
              <span><i class="fas fa-search"></i></span>
              <span><i class="far fa-heart"></i></span>
              <span><i class="fas fa-sliders-h"></i></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">Bambi Print Mini Backpack</a>
            <div class="price">
              <span>$150</span>
            </div>
          </div>
          </div>
          <div class="product">
          <div class="img-container">
            <img src="./images/product1.jpg" alt="" />
            <div class="addCart">
              <i class="fas fa-shopping-cart"></i>
            </div>
  
            <ul class="side-icons">
              <span><i class="fas fa-search"></i></span>
              <span><i class="far fa-heart"></i></span>
              <span><i class="fas fa-sliders-h"></i></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">Bambi Print Mini Backpack</a>
            <div class="price">
              <span>$150</span>
            </div>
          </div>
          </div>
          <div class="product">
          <div class="img-container">
            <img src="./images/product1.jpg" alt="" />
            <div class="addCart">
              <i class="fas fa-shopping-cart"></i>
            </div>
  
            <ul class="side-icons">
              <span><i class="fas fa-search"></i></span>
              <span><i class="far fa-heart"></i></span>
              <span><i class="fas fa-sliders-h"></i></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">Bambi Print Mini Backpack</a>
            <div class="price">
              <span>$150</span>
            </div>
          </div>
          </div>
          </div>
      )}
    </section>
  )
}

export default NewDishes
