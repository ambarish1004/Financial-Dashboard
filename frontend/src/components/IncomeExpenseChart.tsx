import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Paper, Typography } from "@mui/material";

const sampleData = [
  { month: "Jan", income: 2200, expense: 1200 },
  { month: "Feb", income: 2500, expense: 1400 },
  { month: "Mar", income: 1800, expense: 1600 },
  { month: "Apr", income: 3000, expense: 1700 },
];

const IncomeExpenseChart = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, background: "#111827", color: "#fff" }}>
      <Typography variant="h6" gutterBottom>
        Income vs Expense
      </Typography>
      <ResponsiveContainer width="100%" height={378}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="month" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#00e676" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#ff5252" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default IncomeExpenseChart;
