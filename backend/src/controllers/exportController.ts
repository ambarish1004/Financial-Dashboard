import { Request, Response } from "express";
import { generateCSV } from "../utils/csvGenerator";

export const exportCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fields } = req.body;

    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      res.status(400).json({ message: "No fields provided" });
      return;
    }

    await generateCSV(fields, res);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "CSV export failed" });
  }
};
