import React from "react";
import MainWrapper from "../components/LandingPage/MainWrapper";
import SectionContainer from "../components/LandingPage/SectionContainer";
import Header from "../components/LandingPage/Header";
import Login from "../components/Login/Login";
import AdvocaciesSection from "../components/LandingPage/AdvocaciesSection";
import SignUp from "../components/SignUp/SignUp";

const SignUpPage = () => {
  return (
    <>
      <MainWrapper>
        <SectionContainer>
          <Header />
          <SignUp />
          <AdvocaciesSection />
        </SectionContainer>
      </MainWrapper>
    </>
  );
};

export default SignUpPage;
