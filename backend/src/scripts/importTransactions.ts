import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Transaction } from "../models/Transaction";

dotenv.config();
const filePath = path.join(__dirname, "../../transactions (1).json");

const importTransactions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await Transaction.deleteMany({});
    await Transaction.insertMany(data);

    console.log("Transactions imported successfully!");
    process.exit();
  } catch (err) {
    console.error("Error importing:", err);
    process.exit(1);
  }
};

importTransactions();
