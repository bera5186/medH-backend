const mongoose = require("mongoose");
require("dotenv").config()

const dbURI = process.env.MONGO_URI

const connectDB = async () => {

    try {
        await mongoose.connect(dbURI, {useNewUrlParser: true })
        console.log("db connected")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB; 