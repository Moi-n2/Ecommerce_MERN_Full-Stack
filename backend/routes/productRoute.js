import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";
import {
  addProduct,
  getProductById,
  listProduct,
  removeProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([{ name: "images", maxCount: 4 }]),
  addProduct
);

productRouter.delete("/:id", adminAuth, removeProduct);
productRouter.get("/:id", getProductById);
productRouter.get("/", listProduct);

export default productRouter;
