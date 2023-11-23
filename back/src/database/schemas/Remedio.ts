import mongoose from "mongoose";

const Remedio = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

export default mongoose.model("Remedio", Remedio);
