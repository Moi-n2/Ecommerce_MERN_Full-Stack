import React, { useState } from "react";
import { SortTypes } from "../assets/assets";

function Sort() {
  const [sortType, setSortType] = useState("");

  return (
    <select
      onChange={(e) => setSortType(e.target.value)}
      className="border-2 border-gray-300 text-sm px-2"
    >
      {SortTypes.map((item, index) => (
        <option key={index} value={item.value}>
          Sort by: {item.label}
        </option>
      ))}
    </select>
  );
}

export default Sort;
