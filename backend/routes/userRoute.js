import express from "express";
import { adminLogin, signUp, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signUp);
userRouter.post("/admin", adminLogin);

export default userRouter;
