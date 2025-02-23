import React from "react";
import { useState } from "react";
import MainWrapper from "../components/LandingPage/MainWrapper";
import SectionContainer from "../components/LandingPage/SectionContainer";
import Header from "../components/LandingPage/Header";
import FormHeader from "../components/AdoptionProcess/FormHeader";
import PersonalForm from "../components/AdoptionProcess/PersonalForm";
import QuestionnaireForm from "../components/AdoptionProcess/QuestionareForm";

const AdoptionProcess = () => {
  const [currentStep, setCurrentStep] = useState("personal");
  const [personalData, setPersonalData] = useState({});
  const [questionnaireData, setQuestionnaireData] = useState({});

  const handlePersonalNext = (data) => {
    setPersonalData(data);
    setCurrentStep("questionnaire");
  };

  const handleQuestionnaireNext = (data) => {
    setQuestionnaireData(data);
  };

  return (
    <MainWrapper>
      <SectionContainer>
        <Header />
        <FormHeader
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          secondStep="questionnaire"
        />

        {currentStep === "personal" ? (
          <PersonalForm
            initialData={personalData}
            onChange={setPersonalData}
            onNext={handlePersonalNext}
          />
        ) : (
          <QuestionnaireForm
            initialData={questionnaireData}
            onChange={setQuestionnaireData}
            onNext={handleQuestionnaireNext}
            personalData={personalData} // Passing personalData to QuestionnaireForm
          />
        )}
      </SectionContainer>
    </MainWrapper>
  );
};

export default AdoptionProcess;
