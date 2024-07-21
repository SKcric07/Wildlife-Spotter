import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonGroup = styled.div`
  display: flex;
  gap: 7px;
  color: #142800;
  line-height: 150%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Button = styled.button`
  font-family: Manrope, sans-serif;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 40px;
  padding: 8px 16px;
  @media (max-width: 991px) {
    padding: 8px 20px;
  }
`;

const LoginButton = styled(Button)`
  background-color: #64f67b;
  color: #000;
`;

const SignupButton = styled(Button)`
  background-color: #ecedec;
  color: #000;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline-flex;
`;

function AuthButtons() {
  return (
    <ButtonGroup>
      <StyledLink to="/signin">
        <LoginButton>Log in</LoginButton>
      </StyledLink>
      <StyledLink to="/signup">
        <SignupButton>Sign up</SignupButton>
      </StyledLink>
    </ButtonGroup>
  );
}

export default AuthButtons;
