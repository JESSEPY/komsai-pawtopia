import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import RoleButton from "./RoleButton";
import RoleInfo from "./RoleInfo";
import dog from "../../assets/icons/dogTravel.svg";
import cat from "../../assets/icons/catEye.svg";
import dogbanner from "../../assets/images/dog.svg";
import Next from "./Next";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("Shelter");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-center flex-col  px-6 pt-16 pb-48">
          <h1 className="font-arpona font-black text-customBlue text-4xl">
            How will you use Pawtopia?
          </h1>
          <p className="text-customBlue text-sm font-medium font-sans pt-2">
            Please select an option below
          </p>
          <div className="flex items-center pt-2 gap-4 ">
            <RoleButton
              role="Shelter"
              selected={selectedRole === "Shelter"}
              onClick={() => handleRoleChange("Shelter")}
            />
            <RoleButton
              role="Adopter"
              selected={selectedRole === "Adopter"}
              onClick={() => handleRoleChange("Adopter")}
            />
          </div>
          {/* Render RoleInfo based on selectedRole */}
          {selectedRole === "Shelter" ? (
            <RoleInfo
              role="Pet Center"
              img={dog}
              text1="List pets for adoption easily."
              text2="Manage pet profiles and adoption requests."
              text3="Connect with potential adopters in your area."
            />
          ) : (
            <RoleInfo
              role="an Adopter"
              img={cat}
              text1="Browse available pets for adoption."
              text2="Adopt a furry friend from shelters."
              text3="Support local shelters and rescues."
            />
          )}
          <Next role={selectedRole} />
        </div>
        <div className="flex justify-center">
          <img src={dogbanner} alt="" className="w-2/3 -mt-48" />
        </div>
      </div>
    </>
  );
};

export default RoleSelection;
