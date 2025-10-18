import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import agentRoutes from "./routes/agentRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import cors from "cors";


dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(cors());

//routes
app.use("/api/auth", authRoutes)
app.use("/api/agents", agentRoutes)
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Task Distribution Backend Running");
});

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})