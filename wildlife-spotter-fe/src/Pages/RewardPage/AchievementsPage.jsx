import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Reward/Layout";
import UserProfile from "../../components/Reward/UserProfile";
import AchievementGrid from "../../components/Reward/AchievementGrid";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { GET_REWARDS_URL } from "../../api/urlsconfig";

// Define achievements data here
const achievementsData = [
  { title: "Rookie Explorer", subtitle: "1st species Spotting", minSpots: 1 },
  { title: "Wildlife Novice", subtitle: "2nd species Spotting", minSpots: 2 },
  { title: "Nature Seeker", subtitle: "3rd species Spotting", minSpots: 3 },
  { title: "Trailblazer", subtitle: "5th species Spotting", minSpots: 5 },
  { title: "Spotting Savant", subtitle: "10th species Spotting", minSpots: 10 },
  { title: "Fauna Fanatic", subtitle: "12th species Spotting", minSpots: 12 },
  { title: "Wild Whisperer", subtitle: "15th species Spotting", minSpots: 15 },
  { title: "Eco Enthusiast", subtitle: "20th species Spotting", minSpots: 20 },
  {
    title: "Biodiversity Buff",
    subtitle: "25th species Spotting",
    minSpots: 25,
  },
  { title: "Pro Pathfinder", subtitle: "30th species Spotting", minSpots: 30 },
];

const AchievementsPage = () => {
  const { user } = useContext(AuthContext);
  const [rewardData, setRewardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reward data from API
    const fetchRewards = async () => {
      if (!user || !user.email) {
        console.error("User email is required and should not be null");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching rewards for email:", user.email);

        const response = await axios.get(
          `${GET_REWARDS_URL}?email=${encodeURIComponent(user.email)}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.data) {
          setRewardData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch rewards", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchRewards();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Filter achievements based on totalAnimalsFound
  const filteredAchievements = rewardData
    ? achievementsData.filter(
        (achievement) => rewardData.total_animals_found >= achievement.minSpots
      )
    : [];

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while data is being fetched
  }

  return (
    <Layout>
      <PageWrapper>
        {rewardData && (
          <>
            <UserProfile
              user={user.name}
              totalAnimalsFound={
                rewardData.reward.sightings.total_count
                  ? rewardData.reward.sightings.total_count
                  : 0
              }
              memberSince={rewardData.year}
              totalAchievements={achievementsData.length}
              achievementsObtained={filteredAchievements.length}
            />
            <AchievementGrid
              achievements={achievementsData}
              totalAnimalsFound={rewardData.total_animals_found}
            />
          </>
        )}
      </PageWrapper>
    </Layout>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
`;

export default AchievementsPage;
