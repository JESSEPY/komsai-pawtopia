import React from "react";
import Cat1 from "../../assets/icons/greenPaw.svg";

const RoleInfo = ({ role, img, text1, text2, text3 }) => {
  return (
    <div className="border rounded-lg my-4 h-48 border-customBorderColor w-5/6">
      <div className="flex flex-col gap-1 p-4">
        <h1 className="mb-2 text-lg text-customBlue font-semibold">
          Sign up as {role}
        </h1>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 px-2">
            {/* List 1 */}
            <div className="flex gap-2">
              <img src={Cat1} alt="" />
              <p className="text-xs text-customBlue text-opacity-80">{text1}</p>
            </div>

            {/* List 2 */}
            <div className="flex gap-2">
              <img src={Cat1} alt="" />
              <p className="text-xs text-customBlue text-opacity-80">{text2}</p>
            </div>
            {/* List 3 */}
            <div className="flex gap-2">
              <img src={Cat1} alt="" />
              <p className="text-xs text-customBlue text-opacity-80">{text3}</p>
            </div>
          </div>
          <img src={img} alt="" className="h-28 -mt-4" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfo;
