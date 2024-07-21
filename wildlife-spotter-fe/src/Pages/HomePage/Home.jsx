import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Home/Layout';
import Hero from '../../components/Home/Hero';
import ImageGallery from '../../components/Home/ImageGallery';
import ExploreSection from '../../components/Home/ExploreSection';


const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {
  return (
    <Layout>
        <HomePageWrapper>
            <Hero />
            <ImageGallery />
            <ExploreSection />
        </HomePageWrapper>
    </Layout>
  );
}

export default Home;