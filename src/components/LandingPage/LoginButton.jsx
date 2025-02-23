import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const LoginButton = () => {
  const location = useLocation(); // ✅ Get current route
  const isLoginPage = location.pathname === "/login"; // ✅ Check if on login page

  return (
    <div className="flex gap-2 items-center">
      <a href="#" className="text-[#25567B] font-semibold text-xs font-sans">
        {isLoginPage ? "Don't have an account?" : "Already have an account?"}
      </a>
      <NavLink
        to={isLoginPage ? "/signup" : "/login"}
        className="rounded-md text-xs font-semibold border-2 border-primary h-8 w-24 text-primary flex items-center justify-center"
      >
        {isLoginPage ? "Sign Up" : "Login"}
      </NavLink>
    </div>
  );
};

export default LoginButton;
