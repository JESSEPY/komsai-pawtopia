import React, { useState } from "react";
import dogbanner from "../../assets/images/dog.svg";
import RoleButton from "../SignUp/RoleButton";
import LoginCard from "./LoginCard";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("Shelter");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <>
      <div className="justify-between flex">
        <div className="flex flex-col px-6 pt-16 pb-12">
          <h1 className="font-arpona font-black text-customBlue text-6xl">
            Lets Adopt!
          </h1>
          <p className="text-customBlue text-sm font-medium font-sans pt-2">
            Welcome back to Pawtopia Log in to continue finding <br />
            loving homes for our furry friends.
          </p>

          <p className="text-customBlue text-sm font-medium font-sans pt-2">
            Please select an option below
          </p>

          {/* Login Card */}
          <LoginCard />
        </div>

        <div className="flex justify-center">
          <img src={dogbanner} alt="Dog banner" className="w-2/3" />
        </div>
      </div>
    </>
  );
};

export default Login;
