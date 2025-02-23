import React from "react";
import { Link } from "react-router-dom";
import Dog from "../../assets/images/dog.svg";
import { NavLink } from "react-router-dom";

const Headline = () => {
  return (
    <section className="px-6 pt-16 flex justify-center">
      <div className="w-11/12 mt-6">
        <p className="text-customBlue font-arpona font-black md:text-5xl">
          A Happy home for{" "}
        </p>
        <p className="font-arpona font-black md:text-6xl text-customBlue">
          Every Happy Paw.
        </p>
        <p className="font-medium md:text-sm text-customBlue w-2/3 mt-6">
          At Home for Pets, we are committed to providing care, compassion, and
          shelter for stray animals, homeless dogs, and pets in need, working
          tirelessly to ensure they find loving homes, proper support, and a
          chance at a better life.
        </p>

        <Link
          to="/select_signup"
          className="transition transform hover:-translate-y-2 duration-300 font-arpona font-black text-white w-36 h-10 mt-6 rounded-2xl bg-primary shadow-[0px_4px_11.5px_0px_rgba(255,_146,_0,_0.60)] flex items-center justify-center"
        >
          Sign Up
        </Link>
      </div>
      <div className="flex justify-center">
        <img src={Dog} alt="" className="pr-20" />
      </div>
    </section>
  );
};

export default Headline;
