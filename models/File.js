const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    hash: String,
    ipfsURL: String,
    email: String,
    name: String,
    desc: String,
    doctor: String,
    date: Date,
    dateCreated: Date
})

module.exports = mongoose.model('File', fileSchema);