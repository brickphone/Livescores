import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// defining schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


// comparing password, if true match
userSchema.methods.matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
  }
}

const UserModel = model("User", userSchema);

export default UserModel;