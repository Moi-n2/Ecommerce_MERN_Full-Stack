import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function ProductItem({ item }) {
  const { currency } = useContext(ShopContext);
  const { _id, image, name, price } = item;

  return (
    <Link
      to={`/product/${_id}`}
      className="text-gray-700 cursor-pointer overflow-hidden"
    >
      <img
        src={image[0]}
        alt="image"
        className="hover:scale-110 transition-all ease-in-out"
      />
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductItem;
