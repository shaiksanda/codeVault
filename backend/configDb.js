
const mongoose = require("mongoose");
const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // stop server if DB fails
    }
}

module.exports = connectMongoDb