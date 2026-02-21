import express from "express";
import dotenv from "dotenv";
import noteRoutes from "../src/routes/noteRoutes.js";
import { connectDB } from "../src/config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __driname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__driname, "../frontend/dist")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__driname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
});
