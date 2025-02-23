import React from "react";
import google from "../../assets/icons/googleIcon.svg";
import NextButton from "./NextButton"; // Assuming NextButton is a separate component

const Next = ({ role }) => {
  return (
    <>
      <div className="flex gap-1 w-5/6 justify-end">
        {/* Google Login Button */}

        {/* Next Button */}
        <NextButton to="/signup" state={{ selectedRole: role }} label="Next" />
      </div>

      {/* Help Text */}
      <div className="flex justify-end w-5/6 pt-2">
        <p className="text-link text-xs cursor-pointer hover:underline">
          Need help signing in?
        </p>
      </div>
    </>
  );
};

export default Next;
