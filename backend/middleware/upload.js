// import multer from "multer";
// import path from "path";

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // store inside "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   }
// });

// // Filter only CSV files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "text/csv") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only CSV files are allowed"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;


import multer from "multer";
import path from "path";
import fs from "fs";
import XLSX from "xlsx";
import Task from "../models/Task.js";  // Task schema
import Agent from "../models/Agent.js"; // Agent schema

// ---------------- MULTER CONFIG ---------------- //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder must exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

// Allow csv + xlsx + xls
const fileFilter = (req, file, cb) => {
  const allowed =
    file.mimetype === "text/csv" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel";

  if (allowed) cb(null, true);
  else cb(new Error("Only CSV, XLS, or XLSX files allowed"), false);
};

const upload = multer({ storage, fileFilter });

// ---------------- FUNCTION TO HANDLE UPLOAD + DISTRIBUTION ---------------- //
const handleTaskUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // detect extension
    const ext = req.file.originalname.split(".").pop().toLowerCase();
    let tasks = [];

    if (ext === "csv" || ext === "xlsx" || ext === "xls") {
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      tasks = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    } else {
      return res.status(400).json({ error: "Invalid file format" });
    }

    if (!tasks || tasks.length === 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "No tasks found in file" });
    }

    // Fetch agents
    const agents = await Agent.find();
    if (agents.length === 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "No agents available" });
    }

    // Distribute tasks in round-robin
    const distributedTasks = [];
    tasks.forEach((task, index) => {
      const assignedAgent = agents[index % agents.length];
      distributedTasks.push({
        ...task,
        agentId: assignedAgent._id,
      });
    });

    // Save tasks to MongoDB
    await Task.insertMany(distributedTasks);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      message: "Tasks uploaded and assigned successfully",
      distributedTasks,
    });
  } catch (err) {
    console.error("Task upload error:", err);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // cleanup on error
    }
    res.status(500).json({ error: "Server error" });
  }
};

export { upload, handleTaskUpload };
