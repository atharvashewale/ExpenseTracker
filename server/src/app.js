import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expense.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/expenses", expenseRoutes);

export default app;