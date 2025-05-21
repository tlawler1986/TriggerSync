const mongoose = require("mongoose");
const {firearmSchema} = require("./firearm");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firearms: [{ type: Schema.Types.ObjectId, ref: 'Firearm' }]
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("User", userSchema);
