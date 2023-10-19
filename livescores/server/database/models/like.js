import { mongoose, model } from "mongoose";

const likeSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

const LikeModel = model("Like", likeSchema)

export default LikeModel;