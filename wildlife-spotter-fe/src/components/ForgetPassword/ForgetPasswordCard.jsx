import React from "react";
import styled from "styled-components";
import ForgetPasswordForm from "./ForgetPasswordForm";

function ForgetPasswordCard() {
  return (
    <CardContent>
      <TitleContainer>
        <Title>Reset Password</Title>
      </TitleContainer>
      <ForgetPasswordForm />
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

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
//   justify-content: flex-start; /* Aligns the title to the start (left) */

`;

const Title = styled.h2`
  color: #333;
  font: 600 28px Fira Sans, sans-serif;
  margin-bottom: 20px;
  margin-left: 30px;
`;

export default ForgetPasswordCard;
