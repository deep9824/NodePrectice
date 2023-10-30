import mongoose from "mongoose";
import { model } from "mongoose";
import { User } from "../interface/basicinterface";
import bcrypt from 'bcryptjs'

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    comparePassword(userPassword: string): boolean;
  }

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  password2: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.methods.comparePassword = async function (password: string) {
    const isPasswordMatch = await bcrypt.compare(password, this.password)
    return isPasswordMatch
}


export default model<UserDoc>("User", userSchema);
