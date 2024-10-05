import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.status(409).json({ message: "This email is already in use." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters long." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newuser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Sign up successfully!", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.status(200).json({ message: "Login successfully", token });
    } else {
      res.status(401).json({ message: "Email or password is incorrect." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.status(200).json({ message: "Login successfully", token });
    } else {
      res.status(401).json({ message: "Email or password is incorrect." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { adminLogin, signUp, login };
