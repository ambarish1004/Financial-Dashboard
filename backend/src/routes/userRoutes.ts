import express from "express";
import { updatePassword, updateProfile, getProfile, getSettings, updateSettings } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
// import { getProfile } from "../controllers/userController";

const router = express.Router();

router.put("/update-password", authMiddleware, updatePassword);
router.put("/update-profile", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getProfile);
router.get("/settings", authMiddleware, getSettings);
router.put("/settings", authMiddleware, updateSettings);

export default router;
