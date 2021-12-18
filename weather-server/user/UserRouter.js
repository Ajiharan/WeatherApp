import express from "express";
import { UsersSchema } from "../models/UserSchema.js";
import dotenv from "dotenv";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../middleware/auth_common.js";

const router = express.Router();
dotenv.config();

//register user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check email already exists
    const isUserExists = await UsersSchema.findOne({ email });
    if (isUserExists) {
      return res.status(400).json("Email already exists");
    }
    const { data, hashed } = await hashPassword(password);
    if (!hashed) {
      return res.status(500).json(data);
    }

    //create new user
    const newRegUser = new UsersSchema({
      name,
      email,
      ...{ password: data },
    });

    await newRegUser.save();

    return res.status(200).json("User created Sucessfully");
  } catch (err) {
    return res.status(500).json(err?.message || "server not connected");
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExists = await UsersSchema.findOne({ email });
    if (!isUserExists) {
      return res.status(400).json("invalid email address");
    }
    const { data, isCompared } = await comparePassword(
      password,
      isUserExists.password
    );
    if (!isCompared) return res.status(500).json(data);
    if (!data) return res.status(400).json("invalid password");

    const { tokenData, isTokenGenerated } = await generateToken({
      ...{ id: isUserExists._id },
      email,
    });
    if (!isTokenGenerated) return res.status(500).json(tokenData);
    return res.header(process.env.SECREAT_KEY, tokenData).json(tokenData);
  } catch (err) {
    return res.status(500).json(err?.message);
  }
});

export default router;
