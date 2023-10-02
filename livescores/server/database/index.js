import { connect } from "mongoose";

const uri = 'mongodb+srv://mattishutt:!boX-netz-20-13@cluster0.2sndkdp.mongodb.net/Livescores'

const mongoConnection = connect(uri).then(
  () => {
    console.log("Connected to mongo")
  },
  err => {
    console.log(err);
  }
);

export default mongoConnection;