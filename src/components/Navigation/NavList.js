import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import NavItem from './NavItem'
import NavBarData from './NavData'
import { logout } from '../../actions/userActions'
import { fetchCategories } from '../../redux/actions/categoryActions'
import {
  CloseIcon,
  Wrapper,
  Top,
  Icon,
  LinkWrapper,
  SearchWrapper,
  Container,
  Button,
  Form,
  DropMenu,
  DropItem,
  DropLink,
  NavItemWrapper,
  OtherLink,
} from "../styles/Navigation/NavList.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { NavItemLink } from '../styles/Navigation/NavItem.styled'
import { toast } from 'react-toastify';

const NavList = ({ menu, setMenu, count }) => {
  const history = useHistory()
  const [search, setSearch] = useState(false)

  const [cookies, removeCookie] = useCookies();
  let accessToken = cookies.access_token;
  // console.log(accessToken)

  const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(fetchCategories())
  }, [])

  const categoriesData = useSelector(state => state.allCategories)
  const { categories , isLoaded } = categoriesData



  console.log(categories, isLoaded)
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

  const logoutHandler = () => {
    removeCookie('access_token');
    history.push('/')
  }

  // const onClick = () => {
  //   logoutHandler()
  //   setMenu(false)
  // }
  
  const homeCategory = {
    title: 'HOME',
    slug: '/',
    subcategories: []
  }

  return (
    <Wrapper className={menu ? 'show' : ''}>
      <Top>
        <CloseIcon onClick={() => setMenu(false)}>
          {/* <i className='fas fa-times'></i> */}
          <FontAwesomeIcon icon={faTimes}/>
        </CloseIcon>
      </Top>
      <NavItem item={homeCategory} setMenu={setMenu} />
      {
        isLoaded ? (
          <>
            {
              categories.map((item) => (
                <NavItem item={item} key={item.id} setMenu={setMenu} />
          ))}
          </>
        ) : (
          <div>
            ....
          </div>
        )
      }

    {accessToken && accessToken !== 'undefined' ? (
        <OtherLink to='#' onClick={logoutHandler}>
          <img src='/images/bx-user.svg' alt='' />
          Logout
        </OtherLink>
      ) : (
        <OtherLink to='/login' onClick={() => setMenu(false)}>
          <img src='/images/bx-user.svg' alt='' />
          Login
        </OtherLink>
      )}
      {accessToken && accessToken !== 'undefined' && (
        <>
          <OtherLink to='/profile' onClick={() => setMenu(false)}>
          Profile
        </OtherLink>
        <OtherLink to='/change-password' onClick={() => setMenu(false)}>
        Change Password
      </OtherLink>
        </>
      )}
       <Icon>
        {
          accessToken && accessToken !== 'undefined' ? (
            <LinkWrapper to='/cart'>
              <img src='/images/shoppingBag.svg' alt='' />
              <small className='count d-flex'>
              {count}
              </small>
            </LinkWrapper>) : (

                  
                    <>
                      <LinkWrapper onClick={(e) => {toast.info('Please Login to view Cart')}}>
                        <img src='/images/shoppingBag.svg' alt='' />
                        {/* <small className='count d-flex'>
                          {count ? count : cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </small> */}
                    </LinkWrapper>
                    </>     
              
            )
          
        }

        {accessToken && accessToken !== 'undefined' ?  (
          <>
            <NavItemWrapper>
              <img src='/images/bx-user.svg' alt='' />

              <DropMenu>
                <DropItem>
                  <DropLink to='/profile'>Profile</DropLink>
                </DropItem>
                <DropItem>
                  <DropLink to='/change-password'>Change Password</DropLink>
                </DropItem>
                <DropItem onClick={logoutHandler}>
                  <DropLink to='#'>Logout</DropLink>
                </DropItem>
              </DropMenu>
            </NavItemWrapper>
          </>
        ) : 
          null
        }
        {
          !accessToken || accessToken === 'undefined' ? (
            <LinkWrapper to='/login'>
              <img src='/images/bx-user.svg' alt='' />
            </LinkWrapper>
          ) : null
        }

        {/* <span onClick={() => setSearch(true)}>
          <img src='/images/search.svg' alt='' />
        </span> */}

        {/* {
          <SearchWrapper className={search ? 'open' : ''}>
            <Container>
              <div>
                <Button onClick={() => setSearch(false)}>
                  <img src='/images/bx-x.svg' alt='' />
                </Button>
                <Form>
                  <input type='search' placeholder='Search' />
                  <button type='submit'>
                    <img src='/images/search-x.svg' alt='' />
                  </button>
                </Form>
              </div>
            </Container>
          </SearchWrapper>
        } */}
      </Icon> 
    </Wrapper>
    
  )
}

export default NavList
