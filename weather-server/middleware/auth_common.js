import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUND = 10;

export const hashPassword = async (plainPassword) => {
  try {
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    const hashPass = bcrypt.hashSync(plainPassword, salt);
    return { data: hashPass, hashed: true };
  } catch (err) {
    console.log(err);
    return { data: err?.message, hashed: false };
  }
};

export const comparePassword = async (plainPass, hashPass) => {
  try {
    const data = await bcrypt.compareSync(plainPass, hashPass);
    return { data, isCompared: true };
  } catch (err) {
    console.log(err);
    return { data: err?.message, isCompared: false };
  }
};

export const generateToken = async ({ id, email }) => {
  try {
    const token = await jwt.sign({ id, email }, process.env.SECREAT_KEY, {
      expiresIn: "1h",
    });

    return { tokenData: token, isTokenGenerated: true };
  } catch (err) {
    console.log(err);
    return { tokenData: err?.message, isTokenGenerated: false };
  }
};
