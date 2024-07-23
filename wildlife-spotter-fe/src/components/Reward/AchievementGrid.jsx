import React from "react";
import styled from "styled-components";
import AchievementCard from "./AchievementCard";

const AchievementGrid = ({ achievements, totalAnimalsFound }) => {
  return (
    <GridWrapper>
      <GridContainer>
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/8f0c055643a556a481318bc00e7b23d6fc5a929349778b0f6e151c092b7acc09?apiKey=af8d42d290434aa4b6b35033c7704e16&"
            title={achievement.title}
            subtitle={achievement.subtitle}
            achieved={totalAnimalsFound >= achievement.minSpots}
          />
        ))}
      </GridContainer>
    </GridWrapper>
  );
};

const GridWrapper = styled.section`
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  display: flex;
  margin-top: 39px;
  width: 100%;
  max-width: 1110px;
  flex-direction: column;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export default AchievementGrid;
