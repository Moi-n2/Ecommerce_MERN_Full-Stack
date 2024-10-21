import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import CartItem from "../components/CartItem";
import Address from "../components/Address";
import { assets } from "../assets/assets";
import { get, post } from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { currency, cartItems, delivery_fee, user, setUser, setPayAddress } =
    useContext(ShopContext);
  const navigate = useNavigate();
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
    const total = cartItems.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);
    setTotal(total.toFixed(2));
  }, [cartItems, delivery_fee]);

  useEffect(() => {
    const defaultAddress = user?.address.find((item) => item.isDefault);
    if (defaultAddress) {
      setAddress(defaultAddress);
    }
  }, [user?.address]);

  const checkOut = async () => {
    console.log(user);

    if (user.cart.length === 0) {
      return toast.warning("Cart is empty!");
    }

    const addressString = Object.entries(address)
      .filter(([key]) => key !== "_id" && key !== "isDefault") // 过滤掉 _id
      .map(([, value]) => value) // 仅获取值
      .join(" ");

    if (!addressString.trim()) {
      return toast.warning("Address is empty!");
    }

    setPayAddress(addressString);

    let url = "/order/create-mobile-order";
    if (payMethod === "stripe") {
      url = "/order/stripe-payment";
      const res = await get(url);
      if (res.success) {
        const { session_url } = res.data;
        window.location.replace(session_url);
      }
      return;
    }

    const data = {
      status: "Cash on delivery",
      address: addressString,
    };

    try {
      const res = await post(url, data);
      if (res.success) {
        console.log("res:", res);

        toast.success(res.message);
        navigate("/orders");
        setUser(res.data);
      }
      console.log("res:", res);
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
                  {(parseFloat(total) * 100 + parseFloat(delivery_fee) * 100) /
                    100}
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
