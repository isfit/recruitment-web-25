import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//This allows you to view the request in the console
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/user", userRouter);

const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017";

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch {
    console.log("Error connecting to the database");
  }
})();

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
