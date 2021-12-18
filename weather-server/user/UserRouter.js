import express from "express";
import { UsersSchema } from "../models/UserSchema.js";
import axios from "../common/Axios.js";
import { WeathersSchema } from "../models/WeatherSchema.js";
import dotenv from "dotenv";
import {
  checkTokenValidity,
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

const getCity = (name) => {
  return axios.get("", {
    params: { q: name, appid: process.env.API_KEY },
  });
};

//get temperature details and store in database
router.post("/temperature", checkTokenValidity, async (req, res) => {
  const { cities, uid } = req.body;
  try {
    const result = await Promise.all([getCity(cities[0]), getCity(cities[1])]);
    const temResult = result.map((r) => {
      return { temp: r.data?.main?.temp, city: r?.data?.name };
    });
    const newWeatherReport = new WeathersSchema({
      cities: temResult,
      uid,
    });
    await newWeatherReport.save();
    res.status(200).json(temResult);
  } catch (err) {
    return res.status(500).json(err?.message);
  }
});

router.post("/getTemp", checkTokenValidity, async (req, res) => {
  try {
    const { uid } = req.body;
    const result = await WeathersSchema.find({ uid })
      .select({ cities: 1, date: 1 })
      .exec();
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
});

export default router;
