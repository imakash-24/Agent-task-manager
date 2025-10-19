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

export const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("✅ Default admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({
      email: "admin@example.com",
      password: hashedPassword,
    });

    console.log("✅ Default admin created successfully (Email: admin@example.com | Password: admin123)");
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};

