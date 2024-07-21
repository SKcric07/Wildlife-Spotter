import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 40px 0px;
  background-color: #fff; /* Adjusted background color to match the original design */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

const FooterLogo = styled.img`
  aspect-ratio: 1.3;
  object-fit: contain;
  width: 100%;
`;

const LogoDescription = styled.p`
  font-family: Manrope, sans-serif;
  color: var(--gray-500, #71717a);
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  margin-top: 16px;
`;

const FooterSectionWrapper = styled.div`
  display: flex;
  gap: 50px; /* Adjust the gap between columns */
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  color: var(--blue-gray-400, #94a3b8);
  letter-spacing: 1px;
  font: 600 13px/138% Manrope, sans-serif;
`;

const SectionLinks = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 37px 0 0;
`;

const SectionLink = styled.li`
  color: var(--Base-02, #090914);
  font: 500 16px/24px Manrope, sans-serif;
  margin-bottom: 12px;
`;

const NewsletterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsletterInput = styled.input`
  font-family: Poppins, sans-serif;
  border-radius: 10px;
  border: 1px solid rgba(228, 228, 231, 1);
  background-color: var(--base-white, #fff);
  margin-top: 34px;
  color: var(--gray-400, #a1a1aa);
  font-weight: 400;
  line-height: 162.5%;
  padding: 20px;
  width: 100%;
  max-width: 300px;
`;

const SubscribeButton = styled.button`
  font-family: Poppins, sans-serif;
  justify-content: center;
  border: none;
  border-radius: 9px;
  background-color: var(--blue-600, #2563eb);
  color: var(--base-white, #fff);
  font-weight: 500;
  text-align: center;
  line-height: 150%;
  padding: 16px;
  margin-top: 12px;
  cursor: pointer;
  width: 100%;
  max-width: 150px;
`;

const Divider = styled.div`
  border-top: 1px solid rgba(226, 232, 240, 1);
  margin: 29px 0;
  width: 80%; /* Reduced width */
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Copyright = styled.p`
  color: var(--Base-02, #090914);
  text-align: center;
  font: 400 14px/157% Poppins, sans-serif;
`;

function Footer() {
  return (
    <FooterWrapper>
      <TopSection>
        <LogoSection>
          <FooterLogo src="https://cdn.builder.io/api/v1/image/assets/TEMP/3081e5d4665a35042b32fd184de2b91032edb2cf951d63b25841e174c8037632?apiKey=e3765372b84f44f7af794f9207eac8b0&" alt="Company Logo" loading="lazy" />
          <LogoDescription>
          Join the Wildlife Spotter community to explore, identify, and learn about local wildlife. Your participation supports wildlife conservation and awareness efforts.
          </LogoDescription>
        </LogoSection>
        <FooterSectionWrapper>
          <FooterSection>
            <SectionTitle>Company</SectionTitle>
            <SectionLinks>
              <SectionLink>About</SectionLink>
              <SectionLink>Features</SectionLink>
              <SectionLink>Community</SectionLink>
              <SectionLink>Works</SectionLink>
            </SectionLinks>
          </FooterSection>
          <FooterSection>
            <SectionTitle>Help</SectionTitle>
            <SectionLinks>
              <SectionLink>Customer Support</SectionLink>
              <SectionLink>Terms & Conditions</SectionLink>
              <SectionLink>Privacy Policy</SectionLink>
            </SectionLinks>
          </FooterSection>
          <NewsletterSection>
            <SectionTitle>Newsletter</SectionTitle>
            <NewsletterInput type="email" placeholder="Enter your email address" />
            <SubscribeButton>Subscribe Now</SubscribeButton>
          </NewsletterSection>
        </FooterSectionWrapper>
      </TopSection>
      <Divider />
      <BottomSection>
        <Copyright>© Copyright 2022, All Rights Reserved by Wildlife Spotter</Copyright>
      </BottomSection>
    </FooterWrapper>
  );
}

export default Footer;
