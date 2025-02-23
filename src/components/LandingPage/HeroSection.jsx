import React from "react";
import Headline from "../LandingPage/Headline";
import Advocacies from "./AdvocaciesSection";

export default function HeroSection() {
  return (
    <div className="bg-sectionBg  flex justify-center container rounded-lg mt-4">
      <div className="flex flex-col justify-center gap-1">
        <Headline />
        <Advocacies />
      </div>
    </div>
  );
}
