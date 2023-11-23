import mongoose from "mongoose";

const Dor = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

export default mongoose.model("Dor", Dor);
