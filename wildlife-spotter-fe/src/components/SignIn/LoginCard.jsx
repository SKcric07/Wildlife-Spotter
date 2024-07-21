import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";

function LoginCard() {
  return (
    <CardContent>
      <Title>Welcome to Wildlife Community</Title>
      <LoginForm />
    </CardContent>
  );
}

const CardContent = styled.div`
  width: 50%;
  padding: 30px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the children horizontally */
  justify-content: center; /* Centers the children vertically */
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  color: #333;
  font: 600 28px Fira Sans, sans-serif;
  margin-bottom: 20px;
  text-align: center; /* Center the title text */
`;

export default LoginCard;
