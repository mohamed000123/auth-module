import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/auth.middleware";

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/protected-route", protect, async (req, res) => {
  res.json("you can get what you want as a logged in user");
});


export default app;
