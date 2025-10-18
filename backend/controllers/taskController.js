
import csv from "csvtojson";
import fs from "fs";
import Task from "../models/Task.js";
import Agent from "../models/Agent.js";

// Controller function
export const uploadAndDistributeTasks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Fetch all agents
    const agents = await Agent.find();
    if (!agents.length) {
      // remove uploaded file if no agents exist
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "No agents found" });
    }

    // Convert CSV to JSON
    const tasksData = await csv().fromFile(req.file.path);

    let i = 0;
    const tasks = await Promise.all(
      tasksData.map(async (row) => {
        const assignedAgent = agents[i % agents.length]; // Round-robin assignment
        i++;

        return Task.create({
          agentId: assignedAgent._id,
          firstName: row.firstName,  // should match CSV header
          phone: row.phone,
          notes: row.notes || "",
        });
      })
    );

    // Remove file after processing
    fs.unlinkSync(req.file.path);

    res.json({ message: "Tasks uploaded & distributed successfully", tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Error uploading tasks" });
  }
};
