import React from "react";

function Title({ text1, text2, subtitle = "" }) {
  return (
    <div className={`text-center sm:text-xl text-lg`}>
      <div className="inline-flex gap-2 items-center mb-3 uppercase">
        <p className="text-gray-500">
          {text1} <span className="text-gray-700 font-medium">{text2}</span>
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 mt-1"></p>
      </div>
      <p className="w-3/4 m-auto text-sm md:text-base text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}

export default Title;
