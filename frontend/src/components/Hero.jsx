import React from "react";
import { assets } from "@/assets/assets";

function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="flex-1 flex flex-col items-start justify-center">
        <div className="m-auto sm:py-0 py-10">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 lg:w-32 h-[2px] bg-[#414141]"></p>
            <p className="uppercase font-medium text-sm md:text-base lg:text-2xl">
              our bestsellers
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:py-8 lg:text-4xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="uppercase font-semibold text-sm md:text-base lg:text-lg">
              SHOP NOW
            </p>
            <p className="w-8 md:w-11 lg:w-32 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <img
        className="w-full sm:w-1/2 justify-self-end"
        src={assets.hero_img}
        alt="hero_img"
      />
    </div>
  );
}

export default Hero;
