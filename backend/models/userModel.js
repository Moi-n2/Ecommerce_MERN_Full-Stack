import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orders: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order",
        },
      ],
      default: [], // 默认值为空数组
    },
    cart: {
      type: [
        {
          productId: {
            // 引用 Product 的 ID
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          },
          quantity: {
            // 添加数量字段
            type: Number,
            min: 1, // 至少为1
          },
          size: {
            // 添加尺码字段
            type: String,
          },
        },
      ],
      default: [], // 默认值为空数组
    },
  },
  { minimize: false, timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
