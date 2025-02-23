import React from "react";
import dogOrigami from "../../assets/icons/dog2.svg";
import LoginButton from "./LoginButton";

export default function Header() {
  return (
    <section className="relative flex justify-between items-center px-6 pt-2">
      <p className="font-arpona font-black text-customBlue">Pawtopia</p>

      <img
        src={dogOrigami}
        alt="Origami Dog Icon"
        className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 md:block hidden"
      />
      <LoginButton />
    </section>
  );
}
