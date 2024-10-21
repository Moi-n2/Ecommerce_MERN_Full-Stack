import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { post } from "../lib/axios";

const VerifyPay = () => {
  const { navigate, isAuthorized, setUser, payAddress } =
    useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");

  const verifyPayment = async () => {
    console.log(success, isAuthorized);

    try {
      if (!isAuthorized) {
        return null;
      }
      if (success === "false") {
        return toast.error("Payment canceled!");
      }

      const response = await post("/order/stripe-verify", {
        address: payAddress,
        success,
      });

      if (response.success) {
        setUser(response.data);
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [isAuthorized]);

  return <div></div>;
};

export default VerifyPay;
