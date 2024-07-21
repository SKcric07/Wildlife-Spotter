import React from "react";
import styled from "styled-components";

function Hero() {
  return (
    <HeroSection>
      <Card>
        <HeroContent>
          <HeroTitle>
            <HighlightedText>Animal Detection</HighlightedText> <br /> System
          </HeroTitle>
          <HeroDescription>
            Identify and learn about local wildlife by uploading images with Wildlife Spotter. Enhance your understanding and appreciation of nature.
          </HeroDescription>
        </HeroContent>
      </Card>
    </HeroSection>
  );
}

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start (left) */
  justify-content: center;
  width: 100%;
  text-align: left; /* Align text to the left */
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  @media (max-width: 991px) {
    padding: 10px;
  }  
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 35px;
  width: auto;
  text-align: left;
  @media (max-width: 991px) {
    padding: 20px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroTitle = styled.h1`
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

const HeroDescription = styled.p`
  color: #162407;
  letter-spacing: -0.26px;
  font: 400 20px Manrope, sans-serif;
  max-width: 600px;
  margin: 0; /* Adjust margin */
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const HighlightedText = styled.span`
  color: #78f279;
`;

export default Hero;
