import React from "react";
import styled from "styled-components";
import Header from "../../components/SignUp/Header";
import LoginCard from "../../components/SignIn/LoginCard";

function SignIn() {
  return (

    <AppWrapper>
      <Header />
      <MainContent>
        <Card>
          <LoginCard />
          <ImageSection>
            <WildlifeImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/cce93baded15cf78beafdae5e82e359b245c19b27d59da6ad1ee73fc4f71def7?apiKey=e3765372b84f44f7af794f9207eac8b0&" alt="Wildlife" />
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

export default SignIn;