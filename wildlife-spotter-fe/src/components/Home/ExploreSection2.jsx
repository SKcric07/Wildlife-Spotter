import React from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h2`
  color: #000;
  text-align: center;
  letter-spacing: -1.2px;
  align-self: center;
  margin-top: 134px;
  font: 600 40px Manrope, sans-serif;
  position: relative;
  overflow: hidden;
  display: inline-block;
  @media (max-width: 991px) {
    margin-top: 40px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #64f67b;
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  max-width: 1110px;
  margin: auto;
  overflow: hidden;
  height: 100%;
`;

const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 16px;
  width: 200%; /* Double the width to accommodate duplicated cards */
  animation: slide 20s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const Card = styled.article`
  border-radius: 12px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  color: #142800;
  padding: 16px;
  min-width: 270px;
  box-sizing: border-box;
`;

const CardImage = styled.img`
  aspect-ratio: 1.32;
  object-fit: cover;
  width: 100%;
`;

const CardContent = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font: 700 16px/150% Manrope, sans-serif;
  position: relative;
  overflow: hidden;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #64f67b;
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

const CardDescription = styled.p`
  margin-top: 8px;
  font: 400 12px Manrope, sans-serif;
`;

function ExploreSection() {
  const cards = [
    {
      id: 1,
      title: "Bird Watching: Wildlife",
      description: "Explore the diverse bird species in their natural habitats. Witness their behavior and listen to their melodious songs.",
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6afda67fd44640083cd04203b8b7a49e2114ca96fdeacf3468259f46772559ad?apiKey=e3765372b84f44f7af794f9207eac8b0&'
    },
    {
      id: 2,
      title: "Butterfly Gardens",
      description: "Discover the colorful world of butterflies in our specially designed gardens. Learn about their life cycles and importance in ecosystems.",
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6afda67fd44640083cd04203b8b7a49e2114ca96fdeacf3468259f46772559ad?apiKey=e3765372b84f44f7af794f9207eac8b0&'
    },
    {
      id: 3,
      title: "Wildflower Meadows",
      description: "Wander through vibrant wildflower meadows. Identify various species and understand their role in supporting local wildlife.",
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6afda67fd44640083cd04203b8b7a49e2114ca96fdeacf3468259f46772559ad?apiKey=e3765372b84f44f7af794f9207eac8b0&'
    },
    {
      id: 4,
      title: "Forest Trails",
      description: "Explore dense forest trails and encounter diverse flora and fauna. Learn about forest ecosystems and conservation efforts.",
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6afda67fd44640083cd04203b8b7a49e2114ca96fdeacf3468259f46772559ad?apiKey=e3765372b84f44f7af794f9207eac8b0&'
    },
    {
      id: 5,
      title: "Mountain Hikes",
      description: "Challenge yourself with mountain hikes. Enjoy breathtaking views and learn about mountain ecosystems.",
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6afda67fd44640083cd04203b8b7a49e2114ca96fdeacf3468259f46772559ad?apiKey=e3765372b84f44f7af794f9207eac8b0&'
    },
    {
      id: 6,
      title: "River Adventures",
      description: "Experience the thrill of river adventures. Observe aquatic wildlife and understand river ecosystems.",
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6afda67fd44640083cd04203b8b7a49e2114ca96fdeacf3468259f46772559ad?apiKey=e3765372b84f44f7af794f9207eac8b0&'
    },
    {
      id: 7,
      title: "Desert Discoveries",
      description: "Explore the unique flora and fauna of desert landscapes. Learn about survival strategies in harsh environments.",
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6afda67fd44640083cd04203b8b7a49e2114ca96fdeacf3468259f46772559ad?apiKey=e3765372b84f44f7af794f9207eac8b0&'
    },
    {
      id: 8,
      title: "Wetland Wonders",
      description: "Discover the rich biodiversity of wetlands. Understand their importance in supporting diverse ecosystems.",
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6afda67fd44640083cd04203b8b7a49e2114ca96fdeacf3468259f46772559ad?apiKey=e3765372b84f44f7af794f9207eac8b0&'
    }
  ];

  return (
    <section>
      <SectionTitle>Explore local species</SectionTitle>
      <CarouselContainer>
        <CardGrid>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage src={card.image} alt={card.title} loading="lazy" />
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
          {cards.map((card, index) => (
            <Card key={index + cards.length}>
              <CardImage src={card.image} alt={card.title} loading="lazy" />
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </CardGrid>
      </CarouselContainer>
    </section>
  );
}

export default ExploreSection;
