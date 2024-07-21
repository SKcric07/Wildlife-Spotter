import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <HeaderWrapper>
      <Logo loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e9d3b3d09c8c9163485b53d08a23f61c1f95603937c745e268084ff02bd34b2?apiKey=e3765372b84f44f7af794f9207eac8b0&" alt="Wildlife Spotter Logo" />
      <Title>Wildlife Spotter</Title>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  aspect-ratio: 1.9; 
  object-fit: contain; 
  width: 134px; 
  max-width: 100%;
`;

const Title = styled.h1`
  font-family: Poppins, sans-serif;
  font-size: 20px;
  color: #78f279;
  font-weight: 700;
  letter-spacing: 0.6px;
  margin: 0;
`;

export default Header;