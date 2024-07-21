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
      <LogoImage src={`${process.env.PUBLIC_URL}/images/headerlogo.png`} alt="Wildlife Spotter Logo" loading="lazy" />
    </Link>
  );
}

export default Logo;
