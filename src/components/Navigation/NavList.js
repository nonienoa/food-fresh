import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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


const NavList = ({ menu, setMenu, count }) => {
  const [search, setSearch] = useState(false)

  const dispatch = useDispatch()
  // const userLogin = useSelector(state => state.userLogin)
  // const { userInfo } = userLogin

  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

  const logoutHandler = () => {
    dispatch(logout())
  }

  const onClick = () => {
    logoutHandler()
    setMenu(false)
  }

  return (
    <Wrapper className={menu ? 'show' : ''}>
      <Top>
        <CloseIcon onClick={() => setMenu(false)}>
          <i className='fas fa-times'></i>
        </CloseIcon>
      </Top>
      {NavBarData.map((item, index) => (
        <NavItem item={item} key={index} setMenu={setMenu} />
      ))}

      {/* {userInfo ? (
        <OtherLink to='#' onClick={onClick}>
          <img src='/images/bx-user.svg' alt='' />
          Logout
        </OtherLink>
      ) : (
        <OtherLink to='/login' onClick={() => setMenu(false)}>
          <img src='/images/bx-user.svg' alt='' />
          Login
        </OtherLink>
      )}
      {userInfo && (
        <OtherLink to='/profile' onClick={() => setMenu(false)}>
          Profile
        </OtherLink>
      )} */}
      {/* <Icon>
        <LinkWrapper to='/cart'>
          <img src='/images/shoppingBag.svg' alt='' />
          <small className='count d-flex'>
            {count ? count : cartItems.reduce((acc, item) => acc + item.qty, 0)}
          </small>
        </LinkWrapper>

        {userInfo ? (
          <>
            <NavItemWrapper>
              <img src='/images/bx-user.svg' alt='' />

              <DropMenu>
                <DropItem>
                  <DropLink to='/profile'>Profile</DropLink>
                </DropItem>
                <DropItem onClick={logoutHandler}>
                  <DropLink to='#'>Logout</DropLink>
                </DropItem>
              </DropMenu>
            </NavItemWrapper>
          </>
        ) : (
          <LinkWrapper to='/login'>
            <img src='/images/bx-user.svg' alt='' />
          </LinkWrapper>
        )}

        <span onClick={() => setSearch(true)}>
          <img src='/images/search.svg' alt='' />
        </span>

        {
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
        }
      </Icon> */}
    </Wrapper>
  )
}

export default NavList
