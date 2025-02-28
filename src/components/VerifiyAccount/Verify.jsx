import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../hooks/userProfile"; // Import user profile hook

const Verify = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(); // Fetch user profile

  const userRole = userProfile?.role || "Adopter"; // Default to "Adopter" if role is undefined

  const handleVerifyClick = () => {
    if (userRole === "Adopter") {
      navigate("/aprocess"); // Redirect Adopters to Adoption Process
    } else if (userRole === "Shelter") {
      navigate("/shelter-process"); // Redirect Shelters to Shelter Verification
    }
  };

  return (
    <div className="w-full flex justify-center sticky top-0 z-50">
      <button
        onClick={handleVerifyClick}
        className="bg-[#EEA746] relative md:left-20 text-white text-sm font-medium py-1 w-full text-center rounded-b-xl shadow-sm"
      >
        {userRole === "Adopter"
          ? "Set up your adopter profile to begin your adoption journey!"
          : "Complete your shelter verification to start listing pets for adoption!"}
      </button>
    </div>
  );
};

export default Verify;
