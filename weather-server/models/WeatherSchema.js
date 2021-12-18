import mongoose from "mongoose";

const Schema = mongoose.Schema;

//create a whether schema model
const WeatherSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cities: [{ city: String, temp: Number }],
});

export const WeathersSchema = mongoose.model("WeathersSchema", WeatherSchema);
