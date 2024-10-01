import React from "react";

function Policy({ item }) {
  const { image, name, desc } = item;
  return (
    <div className="flex-1">
      <img src={image} className="w-12 m-auto mb-5" alt="" />
      <p className="font-semibold">{name}</p>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

export default Policy;
