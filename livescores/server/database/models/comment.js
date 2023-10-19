import { mongoose, model } from "mongoose";

const commentSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  text: String,
});

const CommentModel = model("Comment", commentSchema)

export default CommentModel;