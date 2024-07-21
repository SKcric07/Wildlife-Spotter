import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start (left) */
  text-align: left; /* Align text to the left */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 35px;
  width: fit-content;
  text-align: left;
  @media (max-width: 991px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  color: #000;
  letter-spacing: -2.04px;
  font: 500 56px/74px Inter, sans-serif;
  margin: 0 0 20px 0; /* Remove extra margin */
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 59px;
  }
`;

const HighlightedText = styled.span`
  color: #78f279;
`;

const Description = styled.p`
  color: #162407;
  letter-spacing: -0.26px;
  font: 400 20px Manrope, sans-serif;
  max-width: 600px;
  margin: 32px 0; /* Adjust margin */
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 16px; /* Adjust margin */
  gap: 16px;
  font-size: 13px;
  color: #142800;
  font-weight: 700;
  line-height: 150%;
`;

const PrimaryButton = styled(Link)` // Use Link component from react-router-dom
  font-family: Manrope, sans-serif;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 40px;
  background-color: #78f279;
  padding: 12px 32px;
  color: inherit;
  text-decoration: none;
  display: flex;
  @media (max-width: 991px) {
    padding: 12px 20px;
  }
`;

const SecondaryButton = styled.button`
  font-family: Manrope, sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
`;

function Hero() {
  return (
    <HeroSection>
      <Card>
        <Title>
          Add your <HighlightedText>specimen</HighlightedText>
        </Title>
        <Description>
          Identify and learn about local wildlife by uploading images with Wildlife Spotter. Enhance your understanding and appreciation of nature.
        </Description>
        <ButtonGroup>
          <PrimaryButton to="/animal-detection">Wildlife</PrimaryButton> {/* Link to animal-detection */}
          <SecondaryButton>Learn more</SecondaryButton>
        </ButtonGroup>
      </Card>
    </HeroSection>
  );
}

export default Hero;
