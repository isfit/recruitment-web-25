import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const userSchema = new Schema<IUser>(
  {
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model<IUser>("User", userSchema);

export { userModel };
