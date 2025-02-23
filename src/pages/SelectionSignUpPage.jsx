import React from "react";
import MainWrapper from "../components/LandingPage/MainWrapper";
import SectionContainer from "../components/LandingPage/SectionContainer";
import Header from "../components/LandingPage/Header";
import RoleSelection from "../components/SignUp/RoleSelection";
import Next from "../components/SignUp/Next";

const SignUpPage = () => {
  return (
    <>
      <MainWrapper>
        <SectionContainer>
          <Header />
          <RoleSelection />
        </SectionContainer>
      </MainWrapper>
    </>
  );
};

export default SignUpPage;
