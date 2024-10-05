import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  allOrders,
  ordersByUserId,
  placeOrderByCod,
  placeOrderByStripe,
  updateOrderStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/placeByCod", userAuth, placeOrderByCod);
orderRouter.post("placeByStripe", userAuth, placeOrderByStripe);

orderRouter.get("/admin", adminAuth, allOrders);
orderRouter.get("/user", userAuth, ordersByUserId);
orderRouter.patch("/user/:orderId", adminAuth, updateOrderStatus);

orderRouter.post("/verifyStripe", userAuth, verifyStripe);

export default orderRouter;
