import React, { useState } from "react";
import { assets, Filters } from "../assets/assets";

function Filter() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleCategory = () => {};
  return (
    <div>
      <p
        onClick={() => setShowFilter(!showFilter)}
        className="my-2 text-ul flex items-center cursor-pointer gap-2 uppercase"
      >
        Filters
        <img
          src={assets.dropdown_icon}
          className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          alt=""
        />
      </p>

      {Filters.map((filter, index) => (
        <div
          key={index}
          className={`border border-gray-300 pl-5 pr-20 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">{filter.name}</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {filter.option.map((option, idx) => (
              <p className="flex gap-2 items-strech capitalize" key={idx}>
                <input
                  type="checkbox"
                  className="w-3"
                  value={option}
                  onChange={toggleCategory}
                />
                <span>{option}</span>
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Filter;
