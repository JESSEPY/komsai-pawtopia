import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import dogbanner from "../../assets/images/dog.svg";
import RoleButton from "../SignUp/RoleButton";
import SignUpCard from "./SignUpCard"; // Ensure this component is created and works

const SignUp = () => {
  const location = useLocation();
  const selectedRoleFromSelection = location.state?.selectedRole || "Shelter"; // Default to "Shelter"
  const [selectedRole, setSelectedRole] = useState(selectedRoleFromSelection);
  console.log("Selected role from location:", location.state?.selectedRole);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col px-6 pt-16 pb-12">
        <h1 className="font-arpona font-black text-customBlue text-4xl">
          Sign Up as {selectedRole}
        </h1>
        <p className="text-customBlue text-sm font-medium font-sans pt-2">
          Join Pawtopia {selectedRole}! <br /> Sign up to help find loving homes
          for our furry friends.
        </p>

        <p className="text-customBlue text-sm font-medium font-sans pt-2">
          Please select an option below
        </p>

        {/* Role Buttons */}
        <div className="flex items-center pt-4 gap-4">
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

        {/* Sign Up Card */}
        <SignUpCard selectedRole={selectedRole} />
      </div>

      <div className="flex justify-center">
        <img src={dogbanner} alt="Dog banner" className="w-2/3" />
      </div>
    </div>
  );
};

export default SignUp;
