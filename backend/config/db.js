import mongoose from "mongoose"
import { seedAdmin } from "../controllers/authController.js"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.db)
        console.log("Mongodb connected")
        await seedAdmin()
    } catch (error) {
        console.error("MongoDB error:", error.message)
        process.exit(1)
    }
}

export default connectDB