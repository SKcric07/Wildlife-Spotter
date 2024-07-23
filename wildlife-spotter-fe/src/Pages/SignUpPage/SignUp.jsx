import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/SignUp/Header";
import SignUpCard from "../../components/SignUp/SignUpCard";
import axios from "axios";

function SignUp() {
  const [wildlifeImage, setWildlifeImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/randomimage",
          {
            responseType: "blob",
          }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setWildlifeImage(imageUrl);
      } catch (error) {
        console.error("Error fetching random image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomImage();
  }, []);

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <AppWrapper>
      <Header />
      <MainContent>
        <Card>
          <SignUpCard />
          <ImageSection>
            {wildlifeImage && (
              <WildlifeImage
                loading="lazy"
                src={wildlifeImage}
                alt="Wildlife"
              />
            )}
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
  height: calc(
    100vh - 80px
  ); /* Adjust this based on Header height if necessary */
`;

const Card = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
  height: 650px; /* Adjust height as needed */
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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  font-family: Arial, sans-serif;
`;

export default SignUp;
