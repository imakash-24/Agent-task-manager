import express from "express";
import { upload, handleTaskUpload } from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js"; // only admin allowed

const router = express.Router();

// CSV/XLS/XLSX Upload + Distribution
router.post("/upload", protect, upload.single("file"), handleTaskUpload  );

export default router;
