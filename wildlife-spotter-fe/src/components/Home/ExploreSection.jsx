import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const SectionTitle = styled.h2`
  color: #000;
  text-align: center;
  letter-spacing: -1.2px;
  align-self: center;
  margin-top: 70px;
  font: 600 40px Manrope, sans-serif;
  position: relative;
  overflow: hidden;
  display: inline-block;
  @media (max-width: 991px) {
    margin-top: 40px;
  }

  &::after {
    content: "";
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
  transition: transform 0.5s ease;
`;

const Card = styled.article`
  border-radius: 12px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  color: #142800;
  padding: 16px;
  min-width: 270px;
  margin-right: 20px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
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
    content: "";
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
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cardWidth = 290; // Adjust this value based on card width + margin
  const cardGridRef = useRef(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/getlocalspecies",
          {
            count: 8,
          }
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 1200); // Adjust the interval speed as needed

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (currentIndex === cards.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // Match this value to the transition duration
    }
  }, [currentIndex, cards.length]);

  useEffect(() => {
    const cardGrid = cardGridRef.current;
    cardGrid.style.transition = isTransitioning
      ? "transform 0.5s ease"
      : "none";
    cardGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }, [currentIndex, isTransitioning, cardWidth]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section>
      <SectionTitle>Explore local species</SectionTitle>
      <CarouselContainer>
        <CardGrid ref={cardGridRef}>
          {cards.map((card, index) => (
            <Card
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CardImage src={card.image_url} alt={card.name} loading="lazy" />
              <CardContent>
                <CardTitle>{card.name}</CardTitle>
                <CardDescription>{card.details}</CardDescription>
              </CardContent>
            </Card>
          ))}
          {cards.map((card, index) => (
            <Card
              key={index + cards.length}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CardImage src={card.image_url} alt={card.name} loading="lazy" />
              <CardContent>
                <CardTitle>{card.name}</CardTitle>
                <CardDescription>{card.details}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </CardGrid>
      </CarouselContainer>
    </section>
  );
}

export default ExploreSection;
