import mongoose, { Schema } from "mongoose";

export interface RemedioModel extends Document {
  name: string;
  user: Schema.Types.ObjectId | string;
}

const RemedioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Remedio = mongoose.model<RemedioModel>("Remedio", RemedioSchema);

export default Remedio;
