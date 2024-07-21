import React from "react";
import styled from "styled-components";

function HowItWorks() {
  return (
    <Section>
      <ContentWrapper>
        <TextContent>
          <Subtitle>how it works</Subtitle>
          <Title>Animal Detection System</Title>
          <Description>
            1. Capture: Take a clear photo of the wildlife you spot in your surroundings.
          </Description>
          <Description>
            2. Upload: Easily upload your photo using our user-friendly interface.
          </Description>
          <Description>
            3. Identify: Our system will help you identify the animal and provide detailed information.
          </Description>
          <Description>
            4. Share: Share your findings with the community and contribute to wildlife conservation.
          </Description>
          <UploadButton>Upload</UploadButton>
        </TextContent>
      </ContentWrapper>
      <ImageUploadWrapper>
        <ImageUploadArea>
          <PlusIcon>+</PlusIcon>
          <UploadText>Add your image</UploadText>
        </ImageUploadArea>
      </ImageUploadWrapper>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  align-self: center;
  margin-top: 70px;
  width: 100%;
  max-width: 1110px;
  gap: 20px;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  font-size: 16px;
  color: var(--Color, #162407);
  font-weight: 400;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Ensure it grows to fill the height */

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Subtitle = styled.h2`
  font-family: Manrope, sans-serif;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Title = styled.h3`
  letter-spacing: -2.04px;
  font: 500 32px Manrope, sans-serif;
  margin-top: 0px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Description = styled.p`
  font-family: Manrope, sans-serif;
  letter-spacing: -0.26px;
  margin-top: 15px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const UploadButton = styled.button`
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
  color: #142800;
  text-decoration: none;
  display: flex;
  margin-top: 26px;
  width: 203px;

  @media (max-width: 991px) {
    padding: 12px 20px;
  }
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ImageUploadArea = styled.div`
  border-radius: 12px;
  background-color: #e6e4e4;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 80px 60px;
  border: 1px dashed #817575;
  height: 100%; /* Make it take up the remaining height */

  @media (max-width: 991px) {
    margin-top: 30px;
    padding: 40px 20px;
  }
`;

const PlusIcon = styled.span`
  color: #817575;
  font: 120px/41% Manrope, sans-serif;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const UploadText = styled.p`
  color: var(--Color, #162407);
  text-align: center;
  letter-spacing: -0.26px;
  margin-top: 21px;
  font: 16px Manrope, sans-serif;
`;

export default HowItWorks;
