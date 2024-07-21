import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoImage = styled.img`
  aspect-ratio: 1.5;
  object-fit: contain;
  object-position: center;
  width: 170px;
  max-width: 100%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

function Logo() {
  return (
    <Link to="/home">
      <LogoImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e9d3b3d09c8c9163485b53d08a23f61c1f95603937c745e268084ff02bd34b2?apiKey=e3765372b84f44f7af794f9207eac8b0&" alt="Wildlife Spotter Logo" loading="lazy" />
    </Link>
  );
}

export default Logo;
