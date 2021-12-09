import React from 'react'
import { Link } from 'react-router-dom'
import {
  NavItemLink,
  NavDropMenu,
  NavDropItem,
  NavDropLink,
  NavMegaMenu,
  NavContent,
  NavRow,
  NavHeader,
  NavMegaList,
  NavMegaItem,
  NavMegaLink,
  NavItemWrapper,
  NavInput,
  NavLabel,
} from "../styles/Navigation/NavItem.styled"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const showIcon = () => {
  return (
    // <i className='fas fa-chevron-down'></i>
    <FontAwesomeIcon icon={faChevronDown} />

  )
}

const NavItem = ( {item, setMenu }) => {
  return (
    <NavItemWrapper>

      {
        (item.slug === '/') ? (
          <NavItemLink
            to="/"
            className={item.title}
            onClick={() => setMenu(false)}
          >
            {item.title}
            <span>{item.subcategories.length > 0 ? (showIcon()) : (<></>)}</span>
          </NavItemLink>
        ) :
        (
          <NavItemLink
            to={ `/products/category/${item.slug}`}
            className={item.title}
            onClick={() => setMenu(false)}
          >
            {item.title}
            <span>{item.subcategories.length > 0 ? (showIcon()) : (<></>)}</span>
          </NavItemLink>
        )
      }
      {item.subcategories.length > 0 && (
        <>
          <NavInput type='checkbox' id={item.title} />
          <NavLabel htmlFor={item.title}>
            {item.title}
            <span>
              {/* <i className='fas fa-chevron-down'></i> */}
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </NavLabel>

          <NavDropMenu>
            {item.subcategories.map((item, index) => {
              return (
                <NavDropItem key={index} onClick={() => setMenu(false)}>
                  <NavDropLink to={ `/products/category/${item.slug}`}>{item.title}</NavDropLink>
                </NavDropItem>
              )
            })}
          </NavDropMenu>
        </>
      )}
    </NavItemWrapper>
  )
}

export default NavItem
