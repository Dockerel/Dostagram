import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  avatarUrl: { type: String, default: "../etc/blank-profile.png" },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
