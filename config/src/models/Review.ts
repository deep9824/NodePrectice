import mongoose, { Schema, model } from "mongoose";

const ReviewSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: true
      },
      review: {
        type: String,
        required: true
      }
});

export default model("Review", ReviewSchema);
