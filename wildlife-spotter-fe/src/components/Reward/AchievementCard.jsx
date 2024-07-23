import React from "react";
import styled from "styled-components";

const AchievementCard = ({ imageSrc, title, subtitle, achieved }) => {
  return (
    <CardWrapper achieved={achieved}>
      <AchievementImage src={imageSrc} alt={title} loading="lazy" />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </CardContent>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  border-radius: 12px;
  border: 1px dashed rgba(22, 36, 7, 1);
  background-color: ${({ achieved }) =>
    achieved ? "#f2f2f2" : "#e0e0e0"}; /* Grayed out if not achieved */
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  color: ${({ achieved }) =>
    achieved ? "#162407" : "#9e9e9e"}; /* Dimmed text if not achieved */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  opacity: ${({ achieved }) =>
    achieved ? 1 : 0.6}; /* Reduce opacity if not achieved */
  cursor: ${({ achieved }) =>
    achieved ? "pointer" : "not-allowed"}; /* Change cursor if not achieved */

  @media (max-width: 991px) {
    margin-top: 30px;
    padding: 0 20px;
  }
`;

const AchievementImage = styled.img`
  aspect-ratio: 0.86;
  object-fit: auto;
  object-position: center;
  width: 116px;
  align-self: center;
  max-width: 100%;
`;

const CardContent = styled.div`
  display: flex;
  margin-top: 7px;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  letter-spacing: -2.04px;
  font: 700 32px Manrope, sans-serif;
`;

const CardSubtitle = styled.p`
  text-align: center;
  letter-spacing: -0.26px;
  margin-top: 8px;
  font: 400 16px Manrope, sans-serif;
`;

export default AchievementCard;
