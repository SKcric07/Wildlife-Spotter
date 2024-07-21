import React from "react";
import styled from "styled-components";
import Header from "../../components/SignUp/Header";
import SignUpCard from "../../components/SignUp/SignUpCard";

function SignUp() {
  return (
    <AppWrapper>
      <Header />
      <MainContent>
        <Card>
          <SignUpCard />
          <ImageSection>
            <WildlifeImage loading="lazy" src={`${process.env.PUBLIC_URL}/images/Bird.png`} alt="Wildlife" />
          </ImageSection>
        </Card>
      </MainContent>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 20px;
`;

const Card = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
`;

const ImageSection = styled.aside`
  width: 50%;
  @media (max-width: 991px) {
    display: none;
  }
`;

const WildlifeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default SignUp;