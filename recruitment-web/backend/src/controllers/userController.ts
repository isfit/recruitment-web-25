import { userModel } from "../models/userModel";
import { Response, Request } from "express";

async function signupUser(req: Request, res: Response) {
  const { username, password, email, first_name, last_name } = req.body;
  try {
    const user = await userModel.create({
      username,
      password,
      email,
      first_name,
      last_name,
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Could not create user" });
  }
}

export { signupUser };
