import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {toast} from 'react-toastify'
import { useCookies } from 'react-cookie'
import { fetchAllCart } from '../redux/actions/allCartActions'
import "react-lazy-load-image-component/src/effects/blur.css";
import styled from "styled-components";

import Rating from "../components/Rating";
import {
  listProductDetails,
  removeSelectedProduct,
} from "../redux/actions/productActions";
import CustomLoader from "../components/CustomLoader";
import Alert from "../components/Alert";

import loadingImg from './loading.gif'
import axios from "axios";
import { addToCart } from "../components/Functions/cart";
import useDocumentTitle from "../hooks/useDocumentTitle";
const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 7rem;
  margin: 10rem auto;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 650px) {
    width: 100%;
    height: 45rem;
  }
`;

const Main = styled.div`
  text-align: center;
  background-color: #f6f2f1;
  margin-bottom: 2rem;
  height: 45rem;
  padding: 3rem;

  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
`;

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
`;

const Thumbnail = styled.div`
  height: 10rem;
  background-color: #f6f2f1;
  text-align: center;

  img {
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 650px) {
    width: 6rem;
    height: 6rem;
  }
`;
const CatLabel = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Right = styled.div`
  div {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 650px) {
    margin-top: 5rem;
  }
`;

export const Form = styled.form`
  margin-bottom: 2rem;

  div {
    display: inline-block;
    position: relative;
    z-index: 1;

    span {
      position: absolute;
      top: 50%;
      right: 1rem;
      transform: translateY(-60%);
      font-size: 1.3rem;
      z-index: 0;
      pointer-events: none;
    }
  }
`;

export const Select = styled.select`
  font-family: "Poppins", sans-serif;
  width: 6rem;
  padding: 0.3rem;
  border: 1px solid var(--grey1);
  appearance: none;
  outline: none;
  font-weight: 600;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 2rem;
`;
const Price = styled.div`
  font-size: 600;
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 2rem;
`;

// const LinkWrapper = styled(Link)`
//   display: inline-block;
//   background: var(--primary);
//   padding: 0.8rem 4rem;
//   color: var(--white);
//   border-radius: 3rem;
//   margin-bottom: 2rem;

//   &.disabled{
//     cursor: default,
//     pointer-events: none;
//     color: var(--white);
//     background: var(--grey1);
//   }
// `;


const LinkWrapper = styled.button`
  display: inline-block;
  background: var(--primary);
  padding: 0.8rem 4rem;
  color: var(--white);
  border-radius: 3rem;
  margin-bottom: 2rem;
  cursor: pointer;

  &.disabled{
    cursor: pointer,
    color: var(--white);
    background: var(--grey1);
  }
`;
const Heading = styled.h3`
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const InStock = styled.span`
  display: block;
  margin-bottom: 2rem;
`;

const Discription = styled.p`
  color: var(--grey1);
`;

const QuantityButton = styled.button`
  padding: 5px;
  margin: 2px;
`

const ProductDetailsScreen = ({ match }) => {

  const dispatch = useDispatch()

  const [cookies, removeCookie] = useCookies();
  let accessToken = cookies.access_token;

  const [qty, setQty] = useState(1);

  const { productSlug } = useParams();

  const [loaded, setLoaded] = useState(false);

  const [product, setProduct] = useState([]);

  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await axios.get(`https://uat.ordering-boafresh.ekbana.net/api/v4/product`, {
          headers: {
            'Api-Key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
            'Warehouse-id': '1',
            perPage: 26,
          },
        });
        setLoaded(true);
        if (response.status === 200) {
          let productsData = response.data.data;
          const mainProduct = productsData.filter((product) => product.slug === productSlug);
          setProduct(mainProduct);
        } else {
          console.log('Something went wrong..');
        }
      } catch (err) {
        toast.error(err)
      }
    };
    loadProduct();
  }, [productSlug]);

  console.log(productDetail);
  useDocumentTitle(`Product Details | ${product.map((item) => item.title)}`)

  return (
    <div>
      {
        loaded ? ( 
            <>
              {product.map((item) => {
                  return (
                    <ProductDetails className="container" key={item.id}>
                      <Left>
                        <Main>
                          <LazyLoadImage
                            effect="blur"
                            src={item.images[0].imageName}
                            alt="jjj"
                            placeholderSrc={loadingImg}
                          />
                        </Main>
                        <Thumbnails>
                            <Thumbnail>
                              <img src={item.images[0].imageName} alt='' />
                            </Thumbnail>
                            <Thumbnail>
                              <img src={item.images[0].imageName} alt='' />
                            </Thumbnail>
                            
                          </Thumbnails> 
                      </Left>

                      <Right>
                        <CatLabel>Home/Product Details</CatLabel>
                        <Title>{item.title}</Title>
                        <Rating value={4} />
                        {/* <Price>${productDetail.price}</Price> */}

                        {/* {
                          accessToken && accessToken !== 'undefined' ? (<
                          >
                          {
                            dispatch(fetchAllCart(accessToken))
                          }
                            <div className="quantity">
                            <QuantityButton id="decrease" >
                            
                              -
                            </QuantityButton>
                            <span className="quantity-span">{item.quantity}</span>
                            <QuantityButton id="increase"> 
                              +
                            </QuantityButton>
                          </div>
                          </>
                          ) : (<></>)
                        } */}

                        <InStock>Status: {"In Stock"}</InStock>

                        <LinkWrapper onClick={(e) => {addToCart(e, item.id, accessToken)}}>
                          Add To Cart
                        </LinkWrapper>

                        <Heading>Product Description</Heading>
                        <Discription>
                          {item.description ? (
                            <p>{item.description.replace('<p>', '').replace('</p>', '')}</p>
                            ) : (<><p>Fresh out of the Kitchen.</p></>)}</Discription>
                      </Right>
                    </ProductDetails>
                  );
                })}
            </>
          
        ) : (
            <ProductDetails className="container">
                        <Left>
                          <Main>
                            <LazyLoadImage
                              src={loadingImg}
                              alt="jjj"
                              placeholderSrc={loadingImg}
                            />
                          </Main>
                        </Left>
                        <Right>
                          <CatLabel>Home/T-shirt</CatLabel>
                          <Title>LOading..</Title>
                          <Rating value={4} />
                        </Right>
            </ProductDetails>
        )
      }
    </div>
  );
};

export default ProductDetailsScreen;
