import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import {toast} from 'react-toastify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { fetchCategories } from '../redux/actions/categoryActions';
import NavList from './Navigation/NavList'
import './Navigation/searchbar.css'
import {
  Nav,
  Wrapper,
  LogoWrapper,
  Label,
  LinkWrapper,
} from "./styles/Navigation/Navigation.styled";
import Searchbar from './Navigation/Searchbar';


const Navigation = () => {
  const [menu, setMenu] = useState(false)

  const showMenu = () => setMenu(true)
  const [cookies, removeCookie] = useCookies();
  let accessToken = cookies.access_token;

  const history =useHistory()
  const [allProducts, setAllProducts] = useState([]);
  const [warehouse, setWarehouse] = useState('')
  const [searchValue, setSearchValue] = useState('');


    const fetchAllProducts = async () => {
        try {
          const response = await axios.get(`https://uat.ordering-boafresh.ekbana.net/api/v4/product`, {
            headers: {
              'Api-Key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
              'Warehouse-id': '1',
            },
          });
          if (response.status === 200) {
            setAllProducts(response.data.data);
            setWarehouse(response.data.data[0].warehouses[0].title)
          } else {
            toast.error(`Could'nt load data.`);
          }
        } catch (err) {
          toast.error(err);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, [])


    console.log(allProducts)

  const cart = useSelector(state => state.cart)
  // const { cartItems } = cart
  // const count = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    
    <>
      {/* <Searchbar /> */}
      < div id='search-bar'>
            <span>Welcome you to BoaFresh!  </span>
            <span><FontAwesomeIcon icon={faMapMarker}/> &nbsp; {warehouse}</span>
            <div class="search-box">
                <input type="text" class="search-input" placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)}/>
                <button class="search-button">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
                <div className={searchValue === '' ? null : 'suggestions'}>
                    {allProducts.filter((searchedProducts) => {
                        if (searchValue === '') {
                        return null;
                        }
                        else if (searchedProducts.title.toLowerCase().includes(searchValue.toLowerCase())) {
                        return searchedProducts;
                        }
                    })
                    .map((product) => {
                        return (
                        <div key={product.id}>
                            <Link to={`/product-details/${product.slug}`} onClick={() => setSearchValue('')} className='search-link'>
                            <img src={product.images[0].imageName} alt='product' className='results-img' />
                            {product.title}
                            </Link>
                            <br />
                        </div>
                        );
              })}
          </div>
            </div>
        
        </div>
      <Nav>
      
      <Wrapper className='container'>
      
        <Label onClick={showMenu}>
          {/* <i className='fas fa-bars'></i> */}
          <FontAwesomeIcon icon={faBars}/>
        </Label>
        <LogoWrapper>
          <Link to='/' className='logo'>
            BoaFresh
          </Link>
  
        </LogoWrapper>
        

        <NavList menu={menu} setMenu={setMenu} count={2} />
        <div className='right'>
          
        {
                accessToken && accessToken !== 'undefined' ? (
                  <LinkWrapper to='/profile'>
                    <img src='/images/bx-user.svg' alt='' />
                  </LinkWrapper>
                ): (
                  <LinkWrapper to="/login">
                    <img src='/images/bx-user.svg' alt='' />
                  </LinkWrapper>
                )
              }

              {
                accessToken && accessToken !== 'undefined' ? (
                  <LinkWrapper to='/cart'>
                    <img src='/images/shoppingBag.svg' alt='' />
                    {/* <small className='count d-flex'>
                      0
                    </small> */}
                  </LinkWrapper>
                ): (
                  <LinkWrapper onClick={(e) => {toast.info('Please Login to view Cart')}}>
                    <img src='/images/shoppingBag.svg' alt='' />
                  </LinkWrapper>
                )
              }       
          {/* <LinkWrapper to='/login'>
            <img src='/images/bx-user.svg' alt='' />
          </LinkWrapper>
          <LinkWrapper to='/cart'>
            <img src='/images/shoppingBag.svg' alt='' />
            <small className='count d-flex'>
              0
            </small>
          </LinkWrapper>  */}
            
        </div>
      </Wrapper>
    </Nav>
    
    </>
  )
}

export default Navigation
