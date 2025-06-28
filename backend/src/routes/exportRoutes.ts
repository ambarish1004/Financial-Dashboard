import express from "express";
import { exportCSV } from "../controllers/exportController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();
router.post("/", authMiddleware, exportCSV);

export default router;
