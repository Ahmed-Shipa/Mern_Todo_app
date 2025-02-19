import express from "express";
import {
  addList,
  deleteList,
  getLists,
  updateList,
} from "./list.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { protectedRoutes } from "../../../src/middleware/protectedRoutes.js";

export const listRouter = express.Router();

listRouter.get("/", protectedRoutes, catchError(getLists));
listRouter.post("/addList", protectedRoutes, catchError(addList));
listRouter.put("/update/:id", catchError(updateList));
listRouter.delete("/delete/:id", catchError(deleteList));
