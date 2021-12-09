import styled from "styled-components";
import { Link } from 'react-router-dom'


export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: var(--white);
  height: 6.5rem;
  line-height: 6.5rem;
  grid-area: header;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &.fix-nav {
    width: 100%;
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .right {
    @media (min-width: 996px) {
      display: none;
    }
  }
`

export const LogoWrapper = styled.div`
  .logo {
    color: var(--primary);
    font-size: 2.7rem;
    font-weight: 600;
    padding: 0.5rem;
    border: 3px solid var(--black);

    @media (max-width: 996px) {
      font-size: 2rem;
      font-weight: 600;
      padding: 0.3rem;
      border: 2px solid var(--black);
    }
  }
`

export const Label = styled.label`
  display: none;

  @media (max-width: 996px) {
    display: block;
    color: var(--black);
    font-size: 2rem;
    cursor: pointer;
  }
`

export const LinkWrapper = styled(Link)`
  display: inline-block;
  margin: 0.5 1rem 0 0;
  position: relative;
  z-index: 1;

  .count {
    justify-content: center;
    position: absolute;
    top: 0rem;
    right: -0.8rem;
    background-color: var(--primary);
    height: 2rem;
    padding: 0.5rem;
    color: var(--white);
    font-weight: 700;
    border-radius: 50%;
  }
`
