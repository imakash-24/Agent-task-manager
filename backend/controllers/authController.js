import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, process.env.jwt_secret, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const seedAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await Admin.create({ email: "admin@example.com", password: hashedPassword });
    console.log(hashedPassword)
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

