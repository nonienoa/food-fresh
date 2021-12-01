import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import Rating from '../components/Rating'
import { listProductDetails, removeSelectedProduct } from '../redux/actions/productActions'
import CustomLoader from '../components/CustomLoader'
import Alert from '../components/Alert'

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 7rem;
  margin: 10rem auto;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 650px) {
    width: 100%;
    height: 45rem;
  }
`

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
`

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
`

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
`
const CatLabel = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const Right = styled.div`
  div {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 650px) {
    margin-top: 5rem;
  }
`

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
`

export const Select = styled.select`
  font-family: 'Poppins', sans-serif;
  width: 6rem;
  padding: 0.3rem;
  border: 1px solid var(--grey1);
  appearance: none;
  outline: none;
  font-weight: 600;
  cursor: pointer;
`

const Title = styled.h1`
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 2rem;
`
const Price = styled.div`
  font-size: 600;
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 2rem;
`

const LinkWrapper = styled(Link)`
  display: inline-block;
  background: var(--primary);
  padding: 0.8rem 4rem;
  color: var(--white);
  border-radius: 3rem;
  margin-bottom: 2rem;

  &.disabled{
    cursor: default,
    pointer-events: none;
    color: var(--white);
    background: var(--grey1);
  }
`

const Heading = styled.h3`
  text-transform: uppercase;
  margin-bottom: 1rem;
`

const InStock = styled.span`
  display: block;
  margin-bottom: 2rem;
`

const Discription = styled.p`
  color: var(--grey1);
`

const ProductDetailsScreen = ({ match }) => {
  const [qty, setQty] = useState(1)

  // const { productId } = useParams();
  // const ID = parseInt(productId);
  // let productDetail = useSelector((state) => state.productDetails);
  // const { loading, error, product } = productDetail;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (productId && productId !== "") dispatch(listProductDetails(productId));
  //   return () => {
  //     dispatch(removeSelectedProduct());
  //   };
  // }, [productId]);

  // {!loading && console.log('sdsd', product)}

  // const dispatch = useDispatch()
  // const ProductDetail = useSelector(state => state.productDetails)

  // const { loading, error, product } = ProductDetail

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   dispatch(listProductDetails(match.params.id))
  //   return() => {
  //     dispatch(removeSelectedProduct())
  //   }
  // }, [dispatch, match])

  // {!loading && console.log("prosdfsdf", product.images[0].imageName) }

  const [productDetail, setProductDetail]= useState([]);

    useEffect(()=>{
        fetch(`https://uat.ordering-boafresh.ekbana.net/api/v4/product/${match.params.id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
                    'Warehouse-Id':'1' 
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data=>{
              setProductDetail(data.data);

            })
            .catch(err=>{
                console.log(err);
            })
    },[match.params.id]);

    console.log(productDetail)
    

  return (

 
    <div>
      
        <ProductDetails className='container'>
          
          <Left>
            {/* <Main>
              <img src={(productDetail.images[0]).imageName} alt='jjj' />
            </Main> */}
            {/* <Thumbnails>
              <Thumbnail>
                <img src={productDetail.image} alt='' />
              </Thumbnail>
              <Thumbnail>
                <img src={productDetail.image} alt='' />
              </Thumbnail>
              <Thumbnail>
                <img src={productDetail.image} alt='' />
              </Thumbnail>
              <Thumbnail>
                <img src={productDetail.image} alt='' />
              </Thumbnail>
            </Thumbnails> */}
          </Left>

          <Right>
            <CatLabel>Home/T-shirt</CatLabel>
            <Title>{productDetail.title}</Title>
            <Rating value={4} />
            {/* <Price>${productDetail.price}</Price> */}
          
              <Form>
                <div>
                  <Select value={1} onChange={e => setQty(e.target.value)}>
                    {[...Array(5).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Select>
                  <span>
                    <i className='fas fa-chevron-down'></i>
                  </span>
                </div>
              </Form>
            
            <InStock>
              Status: { 'In Stock'}
            </InStock>

              <LinkWrapper to={`/cart/${match.params.id}?qty=${qty}`}>
                Add To Cart
              </LinkWrapper>
          
            <Heading>Procduct Description</Heading>
            <Discription>dss</Discription>
          </Right>
        </ProductDetails>
      
    </div>
  )
}

export default ProductDetailsScreen
