import mongoose from "mongoose";
import Remedio from "./Remedio";
//import validator from "validator";

const RegisterMedicine = new mongoose.Schema({
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
});

export default mongoose.model("RegisterPain", RegisterMedicine);
