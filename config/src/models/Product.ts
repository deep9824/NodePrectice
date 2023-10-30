import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  departments: {
    type: Array,
    required: true,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

export default model("Product", ProductSchema);
