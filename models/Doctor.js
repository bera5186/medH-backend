const mongoose = require('mongoose');
const mongooseAlgolia = require("mongoose-algolia");
require("dotenv").config()

const doctorSchema = new mongoose.Schema({
    email: String,
    name: String,
    worksAt: String,
    dateJoined: {
        type: Date
    }
})

doctorSchema.plugin(mongooseAlgolia, {
    appId: process.env.APP_ID,
    apiKey: process.env.API_KEY,
    indexName: "doctor",
    debug: true
})

let doctorModel = mongoose.model('Doctor', doctorSchema);
doctorModel.SyncToAlgolia()
doctorModel.SetAlgoliaSettings({
    searchableAttributes: ['name', 'email', 'worksAt'], 
  })

module.exports = doctorModel;
