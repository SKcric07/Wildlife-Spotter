import React from "react";
import styled from "styled-components";

function ResultSection() {
  return (
    <Section>
      <ResultTitle>Result</ResultTitle>
      <ContentWrapper>
        <Card>
          <AnimalName>Kangaroo</AnimalName>
          <ResultDescription>
            Kangaroos are large marsupials found only in Australia. They are known for their powerful hind legs, large feet, and long, strong tails. They use these features to hop around efficiently. Kangaroos are herbivores and primarily eat grass. They are social animals and often live in groups called mobs.
          </ResultDescription>
        </Card>
        <ImageWrapper>
          <ResultImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4ad37739d944f5f414def5bd4716ea6d722c77f6d9bea9f31661b892242851b?apiKey=e3765372b84f44f7af794f9207eac8b0&" alt="Result" />
        </ImageWrapper>
      </ContentWrapper>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  max-width: 1106px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ResultTitle = styled.h2`
  font-family: Manrope, sans-serif;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  font-size: 32px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 35px 10px;
  width: 50%;
  text-align: left;

  @media (max-width: 991px) {
    padding: 20px;
    width: 100%;
  }
`;

const AnimalName = styled.h3`
  font-family: Manrope, sans-serif;
  font-weight: 600;
  margin-top: 0;
  position: relative;
  display: inline-block; /* Ensure it only takes the width of the text */
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #64f67b;
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ResultDescription = styled.p`
  letter-spacing: -0.26px;
  margin-top: 13px;
  font: 400 18px Manrope, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ResultImage = styled.img`
  aspect-ratio: 1.5; /* Match the aspect ratio to the add image component */
  object-fit: cover;
  width: 100%;
  border-radius: 12px;

  @media (max-width: 991px) {
    margin-top: 30px;
    padding: 40px 20px;
  }
`;

export default ResultSection;
