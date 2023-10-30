import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("mongodb connected");
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
};

export default connect;
