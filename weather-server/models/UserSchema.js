import mongoose from "mongoose";

const Schema = mongoose.Schema;
//create a user schema model
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UsersSchema = mongoose.model("UsersSchema", UserSchema);
