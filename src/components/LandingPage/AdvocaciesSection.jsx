import Cat1 from "../../assets/icons/cat1.svg";
import Cat2 from "../../assets/icons/cat2.svg";
import Cat3 from "../../assets/icons/cat3.svg";

import React from "react";

const AdvocaciesSection = () => {
  return (
    <section className="flex flex-col px-6 mb-6 text-customBlue">
      <p className="font-arpona font-black text-xl text-left">Our Advocacies</p>
      <div className="mt-6 flex gap-8 justify-center">
        {/* Advocacy 1 */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <img
            src={Cat1}
            alt="Adopt, Don't Shop Icon"
            className="w-16 h-16 sm:w-18 sm:h-18 lg:w-24 lg:h-24"
          />
          <p className="font-arpona font-black text-md mt-4">
            Adopt, Don't Shop
          </p>
          <p className="text-sm mt-2">
            Promote pet adoption to give stray and homeless animals a second
            chance at life.
          </p>
        </div>

        {/* Advocacy 2 */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <img
            src={Cat2}
            alt="Spay and Neuter Icon"
            className="w-16 h-16 sm:w-18 sm:h-18 lg:w-24 lg:h-24"
          />
          <p className="font-arpona font-black text-md mt-4">Spay and Neuter</p>
          <p className="text-sm mt-2">
            Help control the pet population by encouraging responsible pet
            sterilization.
          </p>
        </div>

        {/* Advocacy 3 */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <img
            src={Cat3}
            alt="Foster Awareness Icon"
            className="w-16 h-16 sm:w-18 sm:h-18 lg:w-24 lg:h-24"
          />
          <p className="font-arpona font-black text-md mt-4">
            Foster Awareness
          </p>
          <p className="text-sm mt-2">
            Raise awareness about the importance of fostering and supporting
            animal shelters.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdvocaciesSection;
