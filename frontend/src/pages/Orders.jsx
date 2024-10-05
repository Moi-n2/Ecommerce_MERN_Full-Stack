import React, { useContext, useEffect } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { get } from "../lib/axios";

function Orders() {
  const { orderData, currency, setOrderData } = useContext(ShopContext);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const res = await get("/api/order/user");
      setOrderData(res.data);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="border-t pt-10">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData?.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 "
          >
            <div className="flex flex-col text-sm gap-6 flex-1">
              {item.items.map((product) => (
                <div
                  className="flex items-center gap-6 text-sm"
                  key={product._id}
                >
                  <img
                    src={product?.product?.image[0]}
                    className="w-16 sm:w-20"
                    alt=""
                  />
                  <div className="space-y-3 flex-1 ml-5">
                    <p className="sm:text-base font-medium">
                      {product?.product?.name}
                    </p>
                    <div className="flex items-center gap-5 mt-1 text-base text-gray-700">
                      <p>
                        Price:
                        {currency} {product?.price} /pc
                      </p>
                      <p>Quantity: {product?.quantity}</p>
                      <p>Size: {product?.size}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div></div>
            </div>

            <div className="md:w-2/5 flex justify-between">
              <div className="space-y-2">
                <p className="mt-1 flex gap-2">
                  Date:
                  <span className="text-gray-400">
                    {new Date(item.createAt).toDateString()}
                  </span>
                </p>
                <p className="mt-1 flex gap-2">
                  Payment:
                  <span className="text-gray-400">{item.payMethod}</span>
                </p>
                <p className="mt-1 flex gap-2">
                  TotalQuantity:
                  <span className="text-gray-400">{item.totalQty}</span>
                </p>
                <p className="mt-1 flex gap-2">
                  TotalPayment:
                  <span className="text-gray-400">{item.totalPayment}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
