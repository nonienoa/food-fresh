import React, {  useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { getAllProducts } from '../../redux/actions/productActions'
import ShowCategories from './ShowCategories'
// import { ProductItem, ImgContainer, Bottom, ProductLink,Price,  PriceLabel} from './Products'
import { addToCart } from '../Functions/cart';
import './showProducts.css'
import CustomLoader from '../CustomLoader';
import useDocumentTitle from '../../hooks/useDocumentTitle';

// const Wrapper = styled.div`
    
// `
const Wrapper = styled.div`
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    gap: 3rem;
    padding: 0 1.6rem;
    margin-top: 5rem;
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


const ShowProducts = () => {
    const [cookies, removeCookie] = useCookies();
     let accessToken = cookies.access_token;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    let { categorySlug } = useParams();

    useDocumentTitle(`BoaFresh | Products`)
    

    const productsData = useSelector(state => state.allProducts)
    const { isLoaded, products } = productsData
    
    // console.log(categorySlug)
    // const categorizedProducts = list.filter((prod) => prod.categorySlug === categorySlug);
    const filterProducts = (products, categorySlug) => {
        return(
            products.filter((prod) => prod.categorySlug === categorySlug)
        )
    }

    // console.log("heer", filterProducts(products, categorySlug))
    return (
        <div className = "container">
            <ShowCategories />
            <Wrapper>
                {
                   isLoaded ? (
                       <>
                        {
                           products.length > 0 ? (
                               <>
                                    {
                                        filterProducts(products, categorySlug) === [] ? (
                                            <>
                                                <p>Sorry not Available at the moment.</p>
                                            </>
                                        ) : (
                                            <>
                                            {
                                                    filterProducts(products, categorySlug).map((item) => {
                                                        return(
                                                            <>
                                                                <ProductItem key={item.id}>
                                                                    <ImgContainer>
                                                                    <Link to={`/product-details/${item.slug}`}>
                                                                        <img src={item.images[0].imageName} alt={item.title} />
                                                                    </Link>
                                                                    {
                                                                        <button onClick={(e) => {addToCart(e, item.id, accessToken)}}>
                                                                            <i className='fas fa-shopping-cart' > Add To Cart</i>
                                                                        </button>
                                                                        
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
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    }
                               </>
                           ) : (
                               <p>No products</p>
                           )
                       }
                       </>
                   ) : (
                    <CustomLoader type='Oval' width={40} height={40} />
                   )
                }
            </Wrapper>
        </div>
    )
}

export default ShowProducts
