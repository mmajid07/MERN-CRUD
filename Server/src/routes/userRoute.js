import express from "express";
import {
  Create,
  DeleteUser,
  GetAll,
  GetOne,
  UpdateUser,
} from "../controllers/userController.js";

const route = express.Router();

route.post("/create", Create);
route.get("/getall", GetAll);
route.get("/getone/:id", GetOne);
route.put("/update/:id", UpdateUser);
route.delete("/delete/:id", DeleteUser);

export default route;
