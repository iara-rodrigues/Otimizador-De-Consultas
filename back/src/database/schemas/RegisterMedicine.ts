import mongoose from "mongoose";
import Remedio from "./Remedio";
//import validator from "validator";

const RegisterMedicine = new mongoose.Schema({
  name: {
    //FK id remedio
    type: String,
    required: true,
  },
  dose: {
    type: String,
    required: true,
  },
  motivo: {
    //FK id dor
    type: String,
    required: false,
  },
  data: {
    type: Date,
    required: true,
  },
  indicacao: {
    type: Boolean,
    required: false,
  },
});

export default mongoose.model("RegisterMedicine", RegisterMedicine);
