import React from "react";
import { NavLink } from "react-router-dom";
import List from "../../assets/icons/sidebar/listIcon.svg";

const PostLostPetButton = () => {
  return (
    <NavLink
      to="lostAPet"
      className=" flex gap-2 font-arpona font-semibold border-4 shadow-lostPetBg/80 shadow-lg border-primary right-4 bg-lostPetBg text-white rounded-2xl py-2 px-6 transtion hover:-translate-y-1 duration-300"
    >
      <img src={List} alt="" />
      Post Lost Pet
    </NavLink>
  );
};

export default PostLostPetButton;

// <NavLink
// to="add-pet"
// className="fixed md:bottom-4 flex gap-2 font-arpona font-semibold border-4 shadow-lostPetBg/80 shadow-lg border-primary right-4 bg-lostPetBg text-white rounded-2xl py-2 px-6 transtion hover:-translate-y-1 duration-300"
// >
// <img src={List} alt="" />
// Post Lost Pet
// </NavLink>
