import bcrypt from "bcrypt";
import validator from "validator";

import { userModel } from "../models/userModel";
import { Response, Request } from "express";

const signupUser = async (req: Request, res: Response) => {
  const { password, email, first_name, last_name } = req.body;

  try {
    //validation
    const exists = await userModel.findOne({ email });

    if (!email || !password || !first_name || !last_name) {
      throw Error("All fields must be filled")
    }
    else if (exists) {
      throw Error("Email is already in use")
    } 
    else if (!validator.isEmail(email)) {
      throw Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
      throw Error("Password is not strong enough")
    }
    //password hashing and user creation
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export { signupUser };
