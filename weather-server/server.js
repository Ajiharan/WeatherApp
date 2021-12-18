import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import UserRouter from "./user/UserRouter.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 70,
});
app.use(limiter);

const PORT = process.env.PORT || 5000;

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connetction successfully");
});

//initialize user router
app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`port listen in ${PORT}`);
});
