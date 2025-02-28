import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser"; // ✅ Fetch user profile dynamically
import ShelterProfile from "./ShelterProfile";
import AdopterProfilePreview from "./AdopterProfile";

const UserProfilePreview = () => {
  const { userId } = useParams(); // ✅ Get userId from URL
  const { userData, isLoading } = useUser(userId); // ✅ Fetch user data

  if (isLoading) return <p>Loading profile...</p>;
  if (!userData) return <p>User profile not found.</p>;

  console.log("Fetched userData:", userData); // ✅ Debugging userData object
  console.log("Checking role:", userData.role); // ✅ Debugging role field

  // Normalize role comparison
  const userRole = userData.role?.toLowerCase(); // ✅ Normalize case for consistency

  if (userRole === "shelter") {
    console.log("Rendering Shelter Profile");
    return <ShelterProfile userId={userId} />;
  } else if (userRole === "adopter") {
    console.log("Rendering Adopter Profile");
    return <AdopterProfilePreview userId={userId} />;
  } else {
    console.log("Invalid role detected:", userRole);
    return <p>Invalid role: Profile type not recognized.</p>;
  }
};

export default UserProfilePreview;
