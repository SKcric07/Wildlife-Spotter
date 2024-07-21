import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'

function CreateAccountButton() {
  return (
    <ButtonWrapper>
      <CreateButton>Create an account</CreateButton>
      <LoginPrompt>
        Already have an account? <LoginLink to="/signin">Log in</LoginLink> 
      </LoginPrompt>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateButton = styled.button`
  border-radius: 32px;
  background-color: #111;
  color: #fff;
  font: 500 18px Fira Sans, sans-serif;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 250px;
`;

const LoginPrompt = styled.p`
  color: #111;
  font: 400 14px Poppins, sans-serif;
  margin-top: 12px;
`;

const LoginLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
  color: #111;
`;

export default CreateAccountButton;