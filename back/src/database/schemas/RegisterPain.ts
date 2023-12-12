import mongoose, { Schema } from "mongoose";
import Remedio from "./Remedio";
//import validator from "validator";

export interface RegisterDorModel extends Document {
  name: string;
  desc: string;
  data: Date;
  user: Schema.Types.ObjectId | string;
}

const RegisterPainSchema = new mongoose.Schema({
  name: {
    //FK id dor
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  data: {
    type: Date,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const RegisterDor = mongoose.model<RegisterDorModel>(
  "RegisterDor",
  RegisterPainSchema
);

export default RegisterDor;
