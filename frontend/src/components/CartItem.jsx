import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { get, post } from "../lib/axios";
import { toast } from "react-toastify";

function CartItem({ item }) {
  const { currency, setUser } = useContext(ShopContext);
  const { product, size, quantity } = item;

  const updateQuantity = async (size, quantity) => {
    try {
      const res = await post("/cart/update", {
        product,
        size,
        quantity,
      });
      toast.success(res.message);
      setUser(res.data);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="py-4 border-t text-gray-700 grid grid-cols-[5fr_1.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
      <div className="flex items-start gap-6">
        <img src={product?.image[0].url} className="w-16 sm:w-20" alt="" />
        <div>
          <p className="text-xs sm:text-lg font-medium">{product?.name}</p>
          <div className="flex item-center gap-5 mt-2">
            <p>
              {currency}
              {product?.price}
            </p>
            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{size}</p>
          </div>
        </div>
      </div>

      <input
        onChange={(e) =>
          e.target.value === "" || e.target.value === "0"
            ? null
            : updateQuantity(size, Number(e.target.value))
        }
        type="number"
        min={1}
        defaultValue={quantity}
        className="border max-w-10 sm:max-w-20 px-1 sm:px2 py-1"
      />
      <img
        onClick={() => updateQuantity(size, 0)}
        src={assets.bin_icon}
        className="w-4 mr-4 sm:w-5 cursor-pointer"
        alt=""
      />
    </div>
  );
}

export default CartItem;
