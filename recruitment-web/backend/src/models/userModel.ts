import mongoose from "mongoose"

const Schema = mongoose.Schema;

interface IUser {
  username: String;
  password: String;
  email: String;
  first_name: String;
  last_name: String;
}

const userSchema = new Schema<IUser>(
    {
        username: {type: String, required: true,unique: true,},
        password: {type: String,required: true,},
        email: {type: String, required: true,unique: true,},
        first_name: { type: String,required: true,},
        last_name: {type: String,required: true,}, 
    },
    { timestamps: true }
);

const userModel = mongoose.model<IUser>("User", userSchema);

export{userModel}


