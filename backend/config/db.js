import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.db)
        console.log("Mongodb connected")
    } catch (error) {
        console.error("MongoDB error:", error.message)
        process.exit(1)
    }
}

export default connectDB