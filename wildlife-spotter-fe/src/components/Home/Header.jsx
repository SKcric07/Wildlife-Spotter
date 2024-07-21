import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthButtons from './AuthButtons';

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
  return (
    <HeaderWrapper>
      <Logo />
      <Navigation />
      <AuthButtons />
    </HeaderWrapper>
  );
}

export default Header;