import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import restRoutes from "./routes/restRoutes.js";

const app = express();

const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}
const profileImageDir = path.join(__dirname, "uploads/profile")
if (!fs.existsSync(profileImageDir)) {
  fs.mkdirSync(profileImageDir)
}
const reviewImageDir = path.join(__dirname, "uploads/review")
if (!fs.existsSync(reviewImageDir)) {
  fs.mkdirSync(reviewImageDir)
}
const setContentType = (req, res, next) => {
  const filePath = path.join(__dirname, req.path)
  if (fs.existsSync(filePath)) {
    const fileExt = path.extname(filePath).toLowerCase()
    const contentTypeMap = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.bmp': 'image/bmp',
      '.webp': 'image/webp',
      '.tiff': 'image/tiff',
      '.ico': 'image/x-icon',
      '.svg': 'image/svg+xml',
      '.svgz': 'image/svg+xml'
    }
    const contentType = contentTypeMap[fileExt]
    if (contentType) {
      res.setHeader('Content-Type', contentType)
    }
  }
  next()
}
app.use("/uploads/profile", setContentType, express.static(profileImageDir))
app.use("/uploads/review", setContentType, express.static(reviewImageDir))
app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(222).send("TasteUCLA");
});
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
app.use("/search", searchRoutes);
app.use("/locations", restRoutes);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Server connected to database");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
