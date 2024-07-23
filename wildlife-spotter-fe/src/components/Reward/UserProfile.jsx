import React from "react";
import styled from "styled-components";

const UserProfile = ({
  user,
  totalAnimalsFound,
  achievementsObtained,
  memberSince,
  totalAchievements,
}) => {
  // Default values if user or its properties are not provided
  const userName = user || "Guest User";
  const memberSinceText = memberSince
    ? `Member since ${memberSince}`
    : "Not Available";
  const contributionCount = totalAnimalsFound || "0";

  // Calculate achievements progress
  const achievementProgress = `${achievementsObtained}/${totalAchievements}`;
  const achievementMessage =
    achievementsObtained === totalAchievements
      ? "You've unlocked all the achievements"
      : "Keep spotting to unlock more achievements!";

  return (
    <ProfileWrapper>
      <ProfileInfo>
        <UserNameWrapper>
          <UserName>{userName}</UserName>
          <MemberSince>{memberSinceText}</MemberSince>
        </UserNameWrapper>
      </ProfileInfo>
      <ContributionInfo>
        <ContributionCount>{contributionCount}</ContributionCount>
        <ContributionLabel>Contributions</ContributionLabel>
      </ContributionInfo>
      <AchievementInfo>
        <AchievementScore>
          <Score>{achievementProgress}</Score>
          <ProgressBar>
            <Progress
              style={{
                width: `${(achievementsObtained / totalAchievements) * 100}%`,
              }}
            />
          </ProgressBar>
        </AchievementScore>
        <AchievementMessage>{achievementMessage}</AchievementMessage>
      </AchievementInfo>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1114px;
  gap: 20px;
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
`;

const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  color: var(--Color, #162407);
  letter-spacing: -2.04px;
  font: 48px/155% Manrope, sans-serif;
  margin-bottom: 0px; /* Adjust margin to reduce space */

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const MemberSince = styled.p`
  color: #5f5f5f;
  letter-spacing: -0.26px;
  font: 16px Manrope, sans-serif;
  margin-top: 0px; /* Adjust margin to reduce space */
`;

const ContributionInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  white-space: nowrap;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const ContributionCount = styled.span`
  color: var(--Color, #162407);
  letter-spacing: -2.04px;
  font: 48px/155% Manrope, sans-serif;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const ContributionLabel = styled.span`
  color: #5f5f5f;
  letter-spacing: -0.26px;
  font: 16px Manrope, sans-serif;
`;

const AchievementInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AchievementScore = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const Score = styled.span`
  color: var(--Color, #162407);
  letter-spacing: -2.04px;
  font: 700 48px/155% Manrope, sans-serif;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const ProgressBar = styled.div`
  border-radius: 28px;
  background-color: #d9d9d9;
  width: 150px; /* Set a width for the progress bar */
  height: 17px;
  overflow: hidden;
`;

const Progress = styled.div`
  border-radius: 28px;
  background-color: #8fd72e;
  height: 100%;
  width: 0%; /* Initial width is 0% and will be updated dynamically */
`;

const AchievementMessage = styled.p`
  color: #5f5f5f;
  letter-spacing: -0.26px;
  font: 700 16px Manrope, sans-serif;
  margin-top: 8px; /* Add a margin to separate it from the progress bar */
`;

export default UserProfile;
