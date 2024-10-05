import mongoose from "mongoose";
import { productSchema } from "./productModel.js";

export const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: {
      type: [
        {
          product: productSchema,
          quantity: {
            // 添加数量字段
            type: Number,
            required: true,
            min: 1, // 至少为1
          },
          size: {
            // 添加尺码字段
            type: String,
            required: true,
          },
          price: {
            // 添加尺码字段
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    payMethod: {
      type: String,
      enum: ["stripe", "razorpay", "cod"],
      required: true,
    },
    totalPayment: {
      type: Number,
      required: true,
      default: 0,
    },
    totalQty: {
      type: Number,
      required: true,
      default: 1,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "order placed",
    },
  },
  { minimize: false, timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
