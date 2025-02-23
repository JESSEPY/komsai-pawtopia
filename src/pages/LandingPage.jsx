import React from "react";
import MainWrapper from "../components/LandingPage/MainWrapper";
import SectionContainer from "../components/LandingPage/SectionContainer";
import Header from "../components/LandingPage/Header";
import HeroSection from "../components/LandingPage/HeroSection";

const HomePage = () => {
  return (
    <>
      <MainWrapper>
        <SectionContainer>
          <Header />
          <HeroSection />
        </SectionContainer>
      </MainWrapper>
    </>
  );
};

export default HomePage;
