import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../redux/actions/categoryActions';
import NavList from './Navigation/NavList'
import {
  Nav,
  Wrapper,
  LogoWrapper,
  Label,
  LinkWrapper,
} from "./styles/Navigation/Navigation.styled";


const Navigation = () => {
  const [menu, setMenu] = useState(false)

  const showMenu = () => setMenu(true)

  // const cart = useSelector(state => state.cart)
  // const { cartItems } = cart
  // const count = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <Nav>
      <Wrapper className='container'>
        <Label onClick={showMenu}>
          <i className='fas fa-bars'></i>
        </Label>
        <LogoWrapper>
          <Link to='/' className='logo'>
            BoaFresh
          </Link>
        </LogoWrapper>

        <NavList menu={menu} setMenu={setMenu} count={2} />
        <div className='right'>
          <LinkWrapper to='/login'>
            <img src='/images/bx-user.svg' alt='' />
          </LinkWrapper>
          <LinkWrapper to='/cart'>
            <img src='/images/shoppingBag.svg' alt='' />
            <small className='count d-flex'>
              1
            </small>
          </LinkWrapper>
        </div>
      </Wrapper>
    </Nav>
  )
}

export default Navigation
