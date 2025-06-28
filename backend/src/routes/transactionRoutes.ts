import express from "express";
import {
  getTransactions,
  getRecentTransactions,
  getDashboardStats,
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getTransactions);
router.get("/recent", authMiddleware, getRecentTransactions);
router.get("/stats", authMiddleware, getDashboardStats);

export default router;
