import mongoose, { Schema, Document } from "mongoose";
// import bcrypt from "bcryptjs";

export interface UserModel extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    //select: false,
  },
});

// UserSchema.pre("save", async function (next) {
//   const hashedPassword = await bcrypt.hash(this.password, 12);
//   this.password = hashedPassword;

//   next();
// });

const User = mongoose.model<UserModel>("User", UserSchema);

export default User;

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const User = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   surname: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false,
//   },
// });

// User.pre("save", async function (next) {
//   const hashedPassword = await bcrypt.hash(this.password, 12);
//   this.password = hashedPassword;

//   next();
// });

// var UserRef = mongoose.model("UserRef", User);

// export default mongoose.model("User", User);
