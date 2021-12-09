import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie';
// import { useHistory } from 'react-router-dom';
import adImage from "../../backpack.jpg";
import styled from 'styled-components'
// import { Modal } from 'react-bootstrap';
import './prod.css'
import Title from '../Title'
import { listProducts } from '../../redux/actions/productActions'
import Alert from '../Alert'
import Message from '../Message'
import CustomLoader from '../../components/CustomLoader'
// import { addToCart } from '../../actions/cartActions'
import { toast } from 'react-toastify'
import { addToCart } from '../Functions/cart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 3rem;
  padding: 0 1.6rem;
  margin-bottom: 5rem;
`

const ImgContainer = styled.div`
  position: relative;
  cursor: pointer;

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

const ProductItem = styled.div`
  overflow: hidden;

  i {
    transition: all 300ms ease-in-out;
  }

  :hover ${IconWrapper} {
    border-radius: 1rem 0 0 0;
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




const Products = () => {
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

          <Wrapper>
          { !loading &&
            homeData &&
            homeData[2] &&
            (homeData[2].sectionDetails) &&
            (homeData[2].sectionDetails.products).map((item) => (
              <ProductItem key={item.id}>
                <ImgContainer>
                  <Link to={`/product-details/${item.slug}`}>
                    <img src={item.images[0].imageName} alt={item.title} />
                  </Link>
                  {
                    <IconWrapper onClick={(e) => {addToCart(e, item.id, accessToken)}}>
                        {/* <i className='fas fa-shopping-cart' > Add To Cart</i> */}
                        <FontAwesomeIcon icon={faShoppingCart}/>
                    </IconWrapper>
                    
                  }
                
                </ImgContainer>
                <Bottom>
                  <ProductLink to="/">
                    {item.title}
                  </ProductLink>
                  <Price>
                    <PriceLabel>${item.unitPrice[0].sellingPrice}</PriceLabel>
                  </Price>
                </Bottom>
              </ProductItem>  
          ))}
          
        </Wrapper>
      )}
    </section>
  )
}

export default Products
