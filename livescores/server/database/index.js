const mongoose = require("mongoose");

const uri = 'mongodb+srv://mattishutt:!boX-netz-20-13@cluster0.2sndkdp.mongodb.net/'

const mongoConnection = mongoose.connect(uri).then(
  () => {
    console.log("Connected to mongo")
  },
  err => {
    console.log(err);
  }
);

module.exports = mongoConnection;