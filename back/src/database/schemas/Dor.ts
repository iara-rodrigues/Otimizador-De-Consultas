import mongoose, { Schema, Document } from "mongoose";

export interface DorModel extends Document {
  name: string;
  user: Schema.Types.ObjectId | string;
}

const DorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Dor = mongoose.model<DorModel>("Dor", DorSchema);

export default Dor;

// import mongoose from "mongoose";

// const Dor = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
// });

// export default mongoose.model("Dor", Dor);
