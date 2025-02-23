import React from "react";
import MainWrapper from "../components/LandingPage/MainWrapper";
import SectionContainer from "../components/LandingPage/SectionContainer";
import Header from "../components/LandingPage/Header";
import { useMediaQuery } from "react-responsive";
import RoleSelection from "../components/SignUp/RoleSelection";
import Login from "../components/Login/Login";
import MoblieLogin from "../components/Login/MoblieLogin";
import AdvocaciesSection from "../components/LandingPage/AdvocaciesSection";

const LoginPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {isMobile ? (
        <MoblieLogin /> // Render MobileLogin for mobile screens
      ) : (
        <MainWrapper>
          <SectionContainer>
            <Header />
            <Login />
            <AdvocaciesSection />
          </SectionContainer>
        </MainWrapper>
      )}
    </>
  );
};

export default LoginPage;
