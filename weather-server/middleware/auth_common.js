import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUND = 10;

//hash plain password
export const hashPassword = async (plainPassword) => {
  try {
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    const hashPass = bcrypt.hashSync(plainPassword, salt);
    return { data: hashPass, hashed: true };
  } catch (err) {
    console.log(err);
    return { data: err, hashed: false };
  }
};

//compare plain and hash password
export const comparePassword = async (plainPass, hashPass) => {
  try {
    const data = await bcrypt.compareSync(plainPass, hashPass);
    return { data, isCompared: true };
  } catch (err) {
    console.log(err);
    return { data: err, isCompared: false };
  }
};

//generate jwt token
export const generateToken = async ({ id, email }) => {
  try {
    const token = await jwt.sign({ id, email }, process.env.SECREAT_KEY, {
      expiresIn: "1h",
    });

    return { tokenData: token, isTokenGenerated: true };
  } catch (err) {
    console.log(err);
    return { tokenData: err, isTokenGenerated: false };
  }
};

//check token validity
const tokenValidator = async (token) => {
  return await jwt.verify(token, process.env.SECREAT_KEY);
};

export const checkTokenValidity = async (req, res, next) => {
  try {
    const jwtToken = await req.header(process.env.SECREAT_KEY);

    if (!jwtToken) return res.status(401).json("unauthorized access");
    req.token = jwtToken;
    const valid = await tokenValidator(jwtToken);

    if (!valid) return res.status(400).json("invalid token");
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};
