import mongoose, { Schema } from "mongoose";
import Remedio from "./Remedio";

export interface RegisterMedicineModel extends Document {
  name: string;
  dose: string;
  motivo: string;
  data: Date;
  indicacao: Boolean;
  user: Schema.Types.ObjectId | string;
}

const RegisterMedicineSchema = new mongoose.Schema({
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const RegisterMedicine = mongoose.model<RegisterMedicineModel>(
  "RegisterMedicine",
  RegisterMedicineSchema
);

export default RegisterMedicine;
