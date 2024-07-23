import React, { useContext } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Navigation from "./Navigation";
import AuthButtons from "./AuthButtons";
import AuthButtons2 from "./AuthButtons2";
import { AuthContext } from "../../AuthContext"; // Adjust the path as necessary

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 70px;
  @media (max-width: 991px) {
    padding: 20px;
    flex-direction: column;
  }
`;

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <HeaderWrapper>
      <Logo />
      <Navigation />
      {user ? <AuthButtons2 /> : <AuthButtons />}
    </HeaderWrapper>
  );
}

export default Header;
