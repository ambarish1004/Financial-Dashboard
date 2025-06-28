import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";


export const getTransactions = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "date",
      order = "desc",
      search = "",
      category,
      status,
      user_id,
    } = req.query;

    const query: any = {};

    // Filters
    if (category) query.category = category;
    if (status) query.status = status;
    if (user_id) query.user_id = user_id;
    if (search) {
      query.$or = [
        { category: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
        { user_id: { $regex: search, $options: "i" } },
      ];
    }

    const transactions = await Transaction.find(query)
      .sort({ [sort as string]: order === "asc" ? 1 : -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Transaction.countDocuments(query);

    res.json({ transactions, total });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// GET /transactions/recent
export const getRecentTransactions = async (_req: Request, res: Response) => {
  try {
    const recent = await Transaction.find().sort({ date: -1 }).limit(5);
    res.json(recent);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recent", error: err });
  }
};

// GET /dashboard/stats
export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const revenue = await Transaction.aggregate([
      { $match: { category: "Revenue", status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Transaction.aggregate([
      { $match: { category: "Expense", status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const savings = (revenue[0]?.total || 0) - (expense[0]?.total || 0);
    const balance = savings; // assuming initial balance is 0

    res.json({
      revenue: revenue[0]?.total || 0,
      expense: expense[0]?.total || 0,
      savings,
      balance,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err });
  }
};
