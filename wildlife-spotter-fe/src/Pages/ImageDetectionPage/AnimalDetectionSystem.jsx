import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

import Hero from "../../components/ImageDetection/Hero";
import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";
import HowItWork from "../../components/ImageDetection/HowItWork";
import ResultDisplay from "../../components/ImageDetection/ResultDisplay";

function AnimalDetectionSystem() {
  const [result, setResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const handleFileUpload = async (file) => {
    setUploadedImage(URL.createObjectURL(file)); // Save the image URL

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/predict",
        formData,
        {
          params: {
            email: user?.email, // Include user's email as a query parameter
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setResult({
          name: data.name,
          details: data.details,
          image: URL.createObjectURL(file), // Use the uploaded file
          status: data.status,
        });
      } else {
        console.error("Error:", response.data);
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  };

  return (
    <StyledContainer>
      <Header />
      <Hero />
      <HowItWork onImageUpload={handleFileUpload} />
      <Divider />
      {result && (
        <ResultDisplay
          name={result.name}
          details={result.details}
          image={result.image}
          status={result.status}
        />
      )}
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
