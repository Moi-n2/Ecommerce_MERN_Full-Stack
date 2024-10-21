import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

function Orders() {
  const { currency, user } = useContext(ShopContext);
  const [orderData, setOrderData] = useState(null);
  useEffect(() => {
    if (user.orders) {
      setOrderData(user?.orders);
    }
  }, [user]);

  const totalQty = (cart) => {
    return cart.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
  };

  const totalPayment = (cart) => {
    return cart.reduce((acc, curr) => {
      return acc + parseFloat(curr.quantity) * parseFloat(curr.product.price);
    }, 0);
  };

  const formateTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
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
              {item.cart.map((cart) => (
                <div
                  className="flex items-center gap-6 text-sm"
                  key={cart.product._id}
                >
                  <img
                    src={cart?.product?.image[0].url}
                    className="w-16 sm:w-20"
                    alt=""
                  />
                  <div className="space-y-3 flex-1 ml-5">
                    <p className="sm:text-base font-medium">
                      {cart?.product?.name}
                    </p>
                    <div className="flex items-center gap-5 mt-1 text-base text-gray-700">
                      <p>
                        Price:
                        {currency} {cart?.product?.price} /pc
                      </p>
                      <p>Quantity: {cart?.quantity}</p>
                      <p>Size: {cart?.size}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div></div>
            </div>

            <div className="md:w-2/5 flex justify-between">
              <div className="space-y-4">
                <p className="mt-1 flex gap-2">
                  Date:
                  <span className="text-gray-400">
                    {formateTime(item.createdAt)}
                  </span>
                </p>
                <p className="mt-1 flex gap-2">
                  Status:
                  <span className="text-gray-400">{item.status}</span>
                </p>
                <p className="mt-1 flex gap-2">
                  TotalQuantity:
                  <span className="text-gray-400">{totalQty(item.cart)}</span>
                </p>
                <p className="mt-1 flex gap-2">
                  TotalPayment:
                  <span className="text-gray-400">
                    {currency} {totalPayment(item.cart)}
                  </span>
                </p>
                <p className="mt-1 flex gap-2">
                  Address:
                  <span className="text-gray-400">{item.address}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
