import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/User";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const hashed = await bcrypt.hash("admin123", 10);

    await User.create({
      email: "admin@loopr.com",
      password: hashed,
      name: "Admin",
    });

    console.log("Admin user created");
    mongoose.disconnect();
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exit(1);
  }
};

createAdmin();
