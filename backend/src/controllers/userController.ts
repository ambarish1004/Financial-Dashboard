import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

// Update Password
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;
  const { newPassword } = req.body;

  if (!newPassword) {
    res.status(400).json({ message: "New password is required" });
    return;
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashed });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: "Name and email are required" });
    return;
  }

  try {
    await User.findByIdAndUpdate(userId, { name, email });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const user = await User.findById(userId).select("name email");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Settings
export const getSettings = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const user = await User.findById(userId).select("settings");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user.settings);
  } catch (err) {
    console.error("Get settings error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Settings
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;
  const updates = req.body;

  try {
    await User.findByIdAndUpdate(userId, { settings: updates });
    res.status(200).json({ message: "Settings updated successfully" });
  } catch (err) {
    console.error("Update settings error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
