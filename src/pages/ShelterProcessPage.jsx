import React, { useState } from "react";
import MainWrapper from "../components/LandingPage/MainWrapper";
import SectionContainer from "../components/LandingPage/SectionContainer";
import Header from "../components/LandingPage/Header";
import FormHeader from "../components/AdoptionProcess/FormHeader";
import ShelterPersonalForm from "../components/AdoptionProcess/ShelterPersonalForm";
import ShelterLegitimacyForm from "../components/AdoptionProcess/ShelterLegitimacyForm";

const ShelterProcess = () => {
  const [currentStep, setCurrentStep] = useState("personal");
  const [personalData, setPersonalData] = useState({});
  const [legitimacyData, setLegitimacyData] = useState({});
  const [personalFormCompleted, setPersonalFormCompleted] = useState(false); // ✅ Track form completion

  const handlePersonalNext = (data) => {
    setPersonalData(data);
    setPersonalFormCompleted(true); // ✅ Mark form as completed
    setCurrentStep("legitimacy");
  };

  const handleLegitimacyNext = (data) => {
    setLegitimacyData(data);
    console.log("Final Shelter Registration Data:", {
      ...personalData,
      ...data,
    });
  };

  // Prevent users from clicking on "Legitimacy" tab before completing the personal form
  const handleTabChange = (step) => {
    if (step === "legitimacy" && !personalFormCompleted) {
      return; // ❌ Do not allow navigation
    }
    setCurrentStep(step);
  };

  return (
    <MainWrapper>
      <SectionContainer>
        <Header />
        <FormHeader
          currentStep={currentStep}
          setCurrentStep={handleTabChange} // ✅ Use our custom function to restrict navigation
          secondStep="legitimacy"
        />
        {currentStep === "personal" ? (
          <ShelterPersonalForm
            initialData={personalData}
            onChange={setPersonalData}
            onNext={handlePersonalNext}
          />
        ) : (
          <ShelterLegitimacyForm
            initialData={legitimacyData}
            onChange={setLegitimacyData}
            onNext={handleLegitimacyNext}
            personalData={personalData}
          />
        )}
      </SectionContainer>
    </MainWrapper>
  );
};

export default ShelterProcess;
