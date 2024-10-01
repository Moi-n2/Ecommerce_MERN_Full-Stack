import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import Address from "../components/Address";
import { assets } from "../assets/assets";

function Cart() {
  const { currency } = useContext(ShopContext);
  const { cartItems } = useContext(ShopContext);
  const [payMethod, setPayMethod] = useState("cod");
  const navigate = useNavigate();

  // const setPayMethod = (val) => {
  //   console.log(val);
  // };
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3 flex justify-start items-center">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartItems?.map((item, index) => (
          <CartItem item={item} key={index} />
        ))}
      </div>

      <div className="flex my-20 gap-10 flex-col sm:flex-row">
        <div className="flex-1">
          <Address />
        </div>

        <div className="flex-1">
          <div className="w-full">
            <div className="text-2xl flex justify-start">
              <Title text1={"CART"} text2={"TOTALS"} />
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>
                  {currency} {1111}
                </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>
                  {currency} {10}
                </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <b>Total</b>
                <b>{currency}1120</b>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="text-2xl flex justify-start">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>

            <div className="flex gap-3 flex-col lg:flex-row mt-5">
              <div
                onClick={() => setPayMethod("stripe")}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                  payMethod === "stripe" ? "primary-color" : ""
                }`}
              >
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
              </div>
              <div
                onClick={() => setPayMethod("razorpay")}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                  payMethod === "razorpay" ? "primary-color" : ""
                }`}
              >
                <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
              </div>

              <div
                onClick={() => setPayMethod("cod")}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                  payMethod === "cod" ? "primary-color" : ""
                }`}
              >
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
