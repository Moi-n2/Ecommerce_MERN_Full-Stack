import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getCart, updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();
cartRouter.get("/", userAuth, getCart);
cartRouter.post("/update", userAuth, updateCart);

export default cartRouter;
