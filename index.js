const express = require("express");

// db
const connectDB = require("./db/db");

// models
const userModel = require("./models/User");
const fileModel = require("./models/File");
const doctorModel = require("./models/Doctor");

// pusher
const pusher = require("./pusher/pusher");

// 3rd party
const { DateTime } = require("luxon");
const morgan = require("morgan");
const Pusher = require("pusher");
const mongoose = require("mongoose");
require("dotenv").config();

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

console.log(pusher)


// app setup
const app = express();
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const PORT = 8000 || process.env.PORT;
morgan("dev");

// connect to atlas
connectDB();

// pusher setup


app.post("/createuser", async (req, res) => {
  try {
    const { email, name, nickname, picture } = req.body;

    const user = new userModel({
      email: email,
      name: name,
      nickname: nickname,
      picture: picture,
      dateCreated: DateTime.local().setZone("UTC+5:30"),
    });

    await user.save();
    res.status(201).json({ msg: "user created" });
  } catch (error) {
    res.status(500).json({ msg: "server died" });
  }
});

app.post("/createfile", async (req, res) => {
  try {
    const { email, hash, name, desc, doctor, date } = req.body;
    const ipfsURL = "https://" + hash + ".ipfs.dweb.link";

    const file = new fileModel({
      hash: hash,
      email: email,
      ipfsURL: ipfsURL,
      name: name,
      desc: desc,
      doctor: doctor,
      date: date,
      dateCreated: DateTime.local().setZone("UTC+5:30"),
    });

    await file.save();
    res.status(201).json({ msg: "file Uploaded" });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

app.post("/getfile", async (req, res) => {
  const { email } = req.body;

  try {
    const fileData = await fileModel.find({ email: email });

    if (fileData.length > 0) {
      res.status(200).json(fileData);
    } else {
      res.status(204).json({ msg: "no data found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Failed" });
  }
});

app.post("/getdata", async (req, res) => {
  const { id } = req.body;
  try {
    const fileData = await fileModel.findById(id);
    console.log(fileData);
    if (fileData) {
      res.status(200).json(fileData);
    } else {
      res.status(204).json({});
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Failed" });
  }
});

app.post("/createdoctor", async (req, res) => {
  const { email, name, worksAt } = req.body;

  const doctor = new doctorModel({
    email: email,
    name: name,
    worksAt: worksAt,
    dateJoined: DateTime.local().setZone("UTC+5:30"),
  });

  const rec = await doctor.save();
  console.log(rec._id);

  //  doctorIndex.saveObject({
  //   name: name,
  //   email: email,
  //   objectID: res._id,
  //   worksAt: worksAt
  //  }).then(suc => {
  //    console.log(suc)
  //  }).catch(err => {
  //    console.log(error)
  //  })

  res.status(200).json({ msg: "Created" });
});


