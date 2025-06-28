# 💰 Financial Dashboard (Loopr Internship Assignment)

A full-stack financial management dashboard built with **React (TypeScript)**, **Node.js**, **Express**, and **MongoDB**. This project allows users to register, login, view and filter transactions, export reports as CSV, and manage personal settings — all in a sleek dashboard UI.

---

## 🚀 Live Demo (optional)

> Add your live links here after deployment

- **Frontend**: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
- **Backend API**: https://financial-dashboard-w2d7.onrender.com

---

### Postman Collection
Postman Collection Link: https://ak-3380667.postman.co/workspace/A-K's-Workspace~319a94bb-fed1-4786-87e1-360ef7d3a868/collection/45952568-bb1bd5aa-e669-406a-b726-c48b52f8e118?action=share&creator=45952568

### Github Link
Github Link: https://github.com/ambarish1004/Financial-Dashboard

## ✨ Features

### 🔐 Authentication
- Signup / Login with JWT
- Protected routes (backend + frontend)

### 📊 Dashboard
- Summary cards (Balance, Revenue, Expenses, Savings)
- Income vs Expense Chart (Recharts)
- Recent Transactions
- All Transactions table with pagination, search, and CSV export

### ⚙️ Settings & Personal Info
- Update name/email/password
- Preferences: dark mode, notifications, language

### 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React + TypeScript | Node.js + Express |
| Vite + MUI (Material UI) | MongoDB + Mongoose |
| React Router DOM | JWT + bcryptjs |
| Recharts | dotenv, fast-csv |

---

## 📁 Folder Structure

loopr-financial-dashboard/
│
├── backend/ # Express.js + MongoDB backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── .env.example
│ ├── index.ts
│
├── frontend/ # React + Vite + MUI frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── App.tsx
│ ├── public/
│ ├── vite.config.ts
│
├── README.md # Project documentation

yaml
Copy
Edit

---

## ⚙️ Backend Setup (`/backend`)

### 1. Install dependencies

```bash
cd backend
npm install
2. Configure .env
Create a .env file based on .env.example:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
3. Run server
bash
Copy
Edit
npm run dev
Server runs at http://localhost:5000

💻 Frontend Setup (/frontend)
1. Install dependencies
bash
Copy
Edit
cd frontend
npm install
2. Start Vite dev server
bash
Copy
Edit
npm run dev
App runs at http://localhost:5173


Test APIs: /auth/login, /transactions, /export-csv, etc.

🔐 Sample API Flow
1. Signup
bash
Copy
Edit
POST /api/auth/signup
json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
2. Login
bash
Copy
Edit
POST /api/auth/login
json
Copy
Edit
{
  "email": "john@example.com",
  "password": "password123"
}
3. Use token
In all protected routes, add:

makefile
Copy
Edit
Authorization: Bearer <your-jwt-token>
🧠 Useful Scripts
Backend
bash
Copy
Edit
npm run dev        # Start backend in dev mode
npm run build      # Build TypeScript
npm start          # Run compiled JS
Frontend
bash
Copy
Edit
npm run dev        # Start Vite dev server
npm run build      # Build production app
🧠 Future Improvements
Export Excel or PDF reports

Admin user roles

Responsive mobile design

Email verification & password reset

