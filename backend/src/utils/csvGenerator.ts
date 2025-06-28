import { Transaction } from "../models/Transaction";
import { Response } from "express";
import { format } from "fast-csv";

export const generateCSV = async (
  fields: string[],
  res: Response
) => {
  const transactions = await Transaction.find().lean();

  const filtered = transactions.map((txn: any) => {
    const selected: any = {};
    for (const field of fields) {
      selected[field] = txn[field];
    }
    return selected;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");

  const csvStream = format({ headers: true });
  csvStream.pipe(res);
  filtered.forEach((row) => csvStream.write(row));
  csvStream.end();
};
