const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    nickname: String,
    picture: String,
    dateCreated: {
        type: Date
    }
})

module.exports = mongoose.model('User', userSchema);