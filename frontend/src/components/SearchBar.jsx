import React, { useContext } from "react";
import { assets } from "@/assets/assets";
import { ShopContext } from "../context/ShopContext";

function SearchBar() {
  const { search, setSearch } = useContext(ShopContext);
  return (
    <div className="text-center w-full">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          placeholder="Search"
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>
    </div>
  );
}

export default SearchBar;
