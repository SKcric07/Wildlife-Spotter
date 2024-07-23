import React from "react";
import styled from "styled-components";

const statusColors = {
  Endangered: "#ff6f61",
  safe: "#4caf50",
  Extinct: "#ff5722",
  fungus: "#9c27b0",
  "Critically Endangered": "#d32f2f",
  Safe: "#4caf50",
  Dangerous: "#f44336",
  Vulnerable: "#ffc107",
  "Generally Safe": "#8bc34a",
  plant: "#4caf50",
  Domesticated: "#ff9800",
};

function ResultDisplay({ name, details, image, status }) {
  return (
    <Container>
      <ImageWrapper>
        <ResultImage src={image} alt={name} />
      </ImageWrapper>
      <DetailsWrapper>
        <StatusLabel color={statusColors[status] || "#000"}>
          {status}
        </StatusLabel>
        <Name>{name}</Name>
        <Description>{details}</Description>
      </DetailsWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 800px;
  margin: auto;
`;

const ImageWrapper = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ResultImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 250px;
  border-radius: 8px;
`;

const DetailsWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const StatusLabel = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.color};
  margin-bottom: 10px;
`;

const Name = styled.h3`
  font-size: 24px;
  margin: 0;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 10px 0 0;
  line-height: 1.5;
`;

export default ResultDisplay;
