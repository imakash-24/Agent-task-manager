import bcrypt from "bcryptjs";
import Agent from "../models/Agent.js";

// Create Agent
export const createAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const exists = await Agent.findOne({ email });
    if (exists) return res.status(400).json({ message: "Agent already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ name, email, mobile, password: hashed });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all agents
export const getAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};

// Update agent
export const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({message:"successfully updated"},agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete agent
export const deleteAgent = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: "Agent deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
