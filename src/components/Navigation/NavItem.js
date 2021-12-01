import React from 'react'
import { Link } from 'react-router-dom'
import {
  NavLink,
  DropMenu,
  DropItem,
  DropLink,
  MegaMenu,
  Content,
  Row,
  Header,
  MegaList,
  MegaItem,
  MegaLink,
  NavItemWrapper,
  Input,
  Label,
} from "../styles/Navigation/NavItem.styled"; 



const NavItem = ( {item, setMenu }) => {
  return (
    <NavItemWrapper>
      <NavLink
        to={item.path}
        className={item.class}
        onClick={() => setMenu(false)}
      >
        {item.title}
        <span>{item.subMenu && item.icon}</span>
        <span>{item.megaMenu && item.icon}</span>
      </NavLink>
      {item.subMenu && (
        <>
          <Input type='checkbox' id={item.label} />
          <Label htmlFor={item.label}>
            {item.title}
            <span>
              <i className='fas fa-chevron-down'></i>
            </span>
          </Label>

          <DropMenu>
            {item.subMenu.map((item, index) => {
              return (
                <DropItem key={index} onClick={() => setMenu(false)}>
                  <DropLink to={item.path}>{item.title}</DropLink>
                </DropItem>
              )
            })}
          </DropMenu>
        </>
      )}

      {item.megaMenu && (
        <>
          <Input type='checkbox' id={item.label} />
          <Label htmlFor={item.label}>
            {item.title}
            <span>
              <i className='fas fa-chevron-down'></i>
            </span>
          </Label>
          <MegaMenu>
            <Content>
              <Row>
                <img src='/images/woman.jpg' alt='' />
              </Row>
              {item.megaMenu.map((item, index) => {
                return (
                  <Row key={index}>
                    <Header>{item.title}</Header>
                    <MegaList>
                      <MegaItem>
                        {item.subItem.map((item, index) => (
                          <MegaLink
                            to={item.path}
                            key={index}
                            onClick={() => setMenu(false)}
                          >
                            {item.title}
                          </MegaLink>
                        ))}
                      </MegaItem>
                    </MegaList>
                  </Row>
                )
              })}
            </Content>
          </MegaMenu>
        </>
      )}
    </NavItemWrapper>
  )
}

export default NavItem
