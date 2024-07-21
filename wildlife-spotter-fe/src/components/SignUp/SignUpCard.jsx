import React from "react";
import styled from "styled-components";
import SignUpForm from "./SignUpForm";
import PasswordRequirements from "./PasswordRequirements";
import MarketingConsent from "./MarketingConsent";
import TermsAndPrivacy from "./TermsAndPrivacy";
import CreateAccountButton from "./CreateAccountButton";

function SignUpCard() {
  return (
    <CardContent>
      <Title>Welcome to Wildlife Community</Title>
      <SignUpForm />
      <PasswordRequirements />
      <MarketingConsent />
      <TermsAndPrivacy />
      <CreateAccountButton />
    </CardContent>
  );
}

const CardContent = styled.div`
  width: 50%;
  padding: 30px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  color: #333;
  font: 600 28px Fira Sans, sans-serif;
  margin-bottom: 34px;
`;


export default SignUpCard;