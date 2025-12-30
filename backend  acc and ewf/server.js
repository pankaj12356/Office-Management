import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./controllers/config/db.js";
import authRoutes from "./routes/auth.routes.js";
import TaskRoutes from "./routes/task.routes.js";
import cron from "node-cron";
import Task from "./models/task.model.js";
import cors from "cors";
dotenv.config();

cron.schedule("0 0 * * *", async () => {
  const thirtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Task.updateMany(
    { createdAt: { $lt: sixtyDayAgo } },
    { $set: { priority: "high" } }
  );
  await Task.updateMany(
    { createdAt: { $gte: sixtyDayAgo } },
    { $set: { priority: "medium" } }
  );
  await Task.updateMany(
    { createdAt: { $lt: thirtyDayAgo } },
    { $set: { priority: "low" } }
  );
  console.log("updated");
});

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/task", TaskRoutes);

app.listen(PORT, () => {
  console.log(`server was running on port : ${PORT}`);
});
