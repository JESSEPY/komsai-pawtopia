import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import back from "../../assets/icons/back.svg";

const FormHeader = ({
  currentStep,
  setCurrentStep,
  secondStep = "questionnaire",
}) => {
  const navigate = useNavigate(); // Initialize navigate function

  // Dynamic step labels based on prop
  const stepLabels = {
    questionnaire: "Questionnaire",
    legitimacy: "Legitimacy",
  };

  return (
    <div className="flex justify-center gap-20 mx-18 mt-8">
      {/* Back Button */}
      <NavLink to="/signup">
        <img src={back} alt="Back" className="h-8" />
      </NavLink>

      {/* Steps */}
      <div className="flex gap-1 mt-2">
        {/* Personal Step */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setCurrentStep("personal")}
        >
          <div
            className={`md:w-72 h-2 rounded-md transition-all duration-300 ease-in-out ${
              currentStep === "personal" ? "bg-primary" : "bg-gray-200"
            }`}
          ></div>
          <p
            className={`font-sans font-semibold transition-all duration-300 ease-in-out ${
              currentStep === "personal" ? "text-primary" : "text-customBlue"
            }`}
          >
            Personal
          </p>
        </div>

        {/* Dynamic Second Step (Questionnaire or Legitimacy) */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setCurrentStep(secondStep)}
        >
          <div
            className={`md:w-72 h-2 rounded-md transition-all duration-300 ease-in-out ${
              currentStep === secondStep ? "bg-primary" : "bg-gray-200"
            }`}
          ></div>
          <p
            className={`font-sans font-semibold transition-all duration-300 ease-in-out ${
              currentStep === secondStep ? "text-primary" : "text-customBlue"
            }`}
          >
            {stepLabels[secondStep]}
          </p>
        </div>
      </div>

      {/* Skip Option */}
      <p
        className="text-customBlue font-sans text-sm cursor-pointer"
        onClick={() => navigate("/home")} // Corrected: Call navigate inside the onClick function
      >
        Skip for now
      </p>
    </div>
  );
};

export default FormHeader;
