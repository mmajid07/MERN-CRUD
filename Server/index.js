import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./src/routes/userRoute.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGOURL;

mongoose
  .connect(url)
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(port, () => {
      console.log(`Server is running on Port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("DB Connection Error ", error);
  });

app.use("/api", route);
