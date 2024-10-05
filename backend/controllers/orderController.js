import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//global variables
const currency = "usd";
const deliveryCharge = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrderByCod = async (req, res) => {
  try {
    const { userId, items, totalQty, totalPayment, address } = req.body;
    const orderData = {
      userId,
      items,
      totalQty,
      totalPayment,
      address,
      payMethod: "cod",
    };

    const newOrder = new orderModel(orderData);
    const order = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      $set: { cart: [] }, // 清空购物车
      $addToSet: { orders: order._id }, // 确保不重复添加
    });

    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const placeOrderByStripe = async (req, res) => {
  try {
    const { userId, items, totalQty, totalPayment, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      totalQty,
      totalPayment,
      address,
      payMethod: "Stripe",
    };

    const newOrder = new orderModel(orderData);
    const order = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      $set: { cart: [] }, // 清空购物车
      $addToSet: { orders: order._id }, // 确保不重复添加
    });

    const line_items = items.map(async (item, index) => ({
      price_data: {
        currency,
        product_data: {
          name: item.product._id,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.status(200).json({ session_url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        status: "Paid successfully by Stripe",
      });
      res.status(200).json({ message: "Paid successfully by Stripe" });
    } else {
      await orderModel.findOneAndDelete(orderId);
      res.status(402).json({ message: "Payment Failed, order was cancelled" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ordersByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, {
      status,
    });
    res.status(200).json({ message: "OrderStatus updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  placeOrderByStripe,
  placeOrderByCod,
  updateOrderStatus,
  ordersByUserId,
  allOrders,
  verifyStripe,
};
