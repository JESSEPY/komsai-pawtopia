import React from "react";
import pawBg from "../../assets/images/paw-bg.png";

export default function MainWrapper({ children }) {
  return (
    <main
      className="min-h-screen bg-contain flex justify-center items-center pt-10 py-10 overflow-y-auto"
      style={{ backgroundImage: `url(${pawBg})` }}
    >
      {children}
    </main>
  );
}
