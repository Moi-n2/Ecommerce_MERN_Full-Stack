import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "@/assets/assets";

function NavBar() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 uppercase navbar underline-offset-8">
        <NavLink to="/" className="hover:underline">
          <p>Home</p>
        </NavLink>
        <NavLink to="/collection" className="hover:underline">
          <p>Collection</p>
        </NavLink>
        <NavLink to="/about" className="hover:underline">
          <p>About</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <Link to="/collection">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 cursor-pointer"
          />
        </Link>

        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute left-[-20px] pt-4 bg-slate-100/65 text-gray-500 rounded w-28 py-3 px-5 space-y-2 underline-offset-4">
            <p className="cursor-pointer hover:text-black hover:underline">
              My profile
            </p>
            <p className="cursor-pointer hover:text-black hover:underline">
              Orders
            </p>
            <p className="cursor-pointer hover:text-black hover:underline">
              Logout
            </p>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[8px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            5
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* {sidemenu for small screen} */}

      <div
        className={`
          flex flex-col text-gray-600 absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
      >
        <div
          className="flex items-center gap-4 p-3 cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <img
            src={assets.dropdown_icon}
            className="h-4 rotate-180"
            alt="dropdown"
          />
          <p>Back</p>
        </div>

        <NavLink
          className="py-4 pl-6 border"
          to="/"
          onClick={() => setVisible(false)}
        >
          Home
        </NavLink>
        <NavLink
          className="py-4 pl-6 border"
          to="/collection"
          onClick={() => setVisible(false)}
        >
          Collection
        </NavLink>
        <NavLink
          className="py-4 pl-6 border"
          to="/about"
          onClick={() => setVisible(false)}
        >
          About
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
