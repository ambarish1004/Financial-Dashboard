import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  settings: {
    darkMode: { type: Boolean, default: true },
    emailNotif: { type: Boolean, default: true },
    smsNotif: { type: Boolean, default: false },
    sessionTimeout: { type: Boolean, default: false },
    language: { type: String, default: "en" },
  },
});

export const User = mongoose.model("User", userSchema);
