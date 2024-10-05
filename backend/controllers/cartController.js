import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await userModel.findById(userId);

    const cartPromises = user.cart.map(async (item) => {
      const product = await productModel.findById(item.productId);
      return {
        _id: item._id,
        quantity: item.quantity,
        size: item.size,
        product,
      };
    });

    // 等待所有 Promise 被解析
    const cart = await Promise.all(cartPromises);

    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity, size, userId } = req.body;
    const user = await userModel.findById(userId);
    let cartData = user.cart.slice();
    const idx = cartData.findIndex(
      (item) => item.productId.equals(productId) && item.size === size
    );

    if (idx !== -1) {
      if (quantity) {
        cartData[idx].quantity = quantity;
      } else {
        if (quantity === undefined) {
          cartData[idx].quantity++;
        }
        if (quantity === 0) {
          cartData.splice(idx, 1);
        }
      }
    } else {
      cartData.push({
        _id: new mongoose.Types.ObjectId(), // 生成新的 _id
        productId,
        quantity: 1,
        size,
      });
    }

    await userModel.findByIdAndUpdate(userId, { cart: cartData });
    res.status(200).json({ message: "Update cart successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { updateCart, getCart };
