import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
const Nav = styled.nav`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  font-size: 18px;
  color: #142800;
  font-weight: 700;
  line-height: 150%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const NavItem = styled(Link)`
  font-family: Manrope, sans-serif;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #64f67b;
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <Nav>
      <NavItem to="/home">Home</NavItem>
      <NavItem to="/animal-detection">Image Identification</NavItem>
      {user && <NavItem to="/reward">Reward</NavItem>}
    </Nav>
  );
}

export default Navigation;
