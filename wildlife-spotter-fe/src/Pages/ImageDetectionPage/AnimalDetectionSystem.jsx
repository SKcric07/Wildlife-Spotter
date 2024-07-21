import React from "react";
import styled from "styled-components";

import Hero from "../../components/ImageDetection/Hero";
import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";
import HowItWork from "../../components/ImageDetection/HowItWork";
import ResultDisplay from "../../components/ImageDetection/ResultDisplay";

function AnimalDetectionSystem() {
  return (
    <StyledContainer>
      <Header />
      <Hero />
      <HowItWork />
      <Divider />
      <ResultDisplay />
      <Footer />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 63px 0 0;
  width: 80%; /* Adjusted width to 80% */
  align-self: center; /* Center the divider */

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export default AnimalDetectionSystem;
