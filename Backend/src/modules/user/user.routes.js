import express from "express";

import { catchError } from "../../middleware/catchError.js";
import {
  deleteUser,
  getUsers,
  login,
  signUp,
  updateUser,
} from "./user.controller.js";
import { check_email_password } from "../../../src/middleware/check_email_pasword.js";

export const userRouter = express.Router();
userRouter.get("/", catchError(getUsers));
userRouter.post("/signUp", catchError(signUp));
userRouter.post("/login", check_email_password, catchError(login));
userRouter.put("/update/:id", catchError(updateUser));
userRouter.delete("/delete/:id", catchError(deleteUser));
