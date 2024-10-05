import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import Address from "../components/Address";
import { assets } from "../assets/assets";
import { get, post } from "../lib/axios";
import { toast } from "react-toastify";

function Cart() {
  const { currency, cartItems, setCartItems, delivery_fee, totalQty } =
    useContext(ShopContext);
  const [payMethod, setPayMethod] = useState("cod");
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);
    setTotal(total);
  }, [cartItems, delivery_fee]);

  const fetchCart = async () => {
    try {
      const res = await get("/api/cart/");
      setCartItems(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const checkOut = async () => {
    let url = "/api/order/placeByCod";
    if (payMethod === "stripe") {
      url = "/api/order/placeByStripe";
    }
    const data = {
      items: cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        price: item.product.price,
      })),
      totalQty: totalQty,
      totalPayment: total,
      address: address,
    };
    try {
      const res = await post(url, data);
      toast.success(res.message);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3 flex justify-start items-center">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartItems?.map((item) => (
          <CartItem item={item} key={item._id} />
        ))}
      </div>

      <div className="flex my-20 gap-10 flex-col sm:flex-row">
        <div className="flex-1">
          <Address address={address} setAddress={setAddress} />
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
                  {currency} {total}
                </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>
                  {currency} {delivery_fee}
                </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <b>Total</b>
                <b>
                  {currency}
                  {total + delivery_fee}
                </b>
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
              {/* <div
                onClick={() => setPayMethod("razorpay")}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                  payMethod === "razorpay" ? "primary-color" : ""
                }`}
              >
                <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
              </div> */}

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
                onClick={checkOut}
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
