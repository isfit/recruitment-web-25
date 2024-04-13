
import express from "express"
import {signupUser} from "../controllers/userController"

const userRouter = express.Router();


userRouter.post('/signup', signupUser);


export{userRouter}