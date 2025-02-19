// catch programming errors
process.on("uncaughtException", () => {
  console.log("error in code");
});

import express from "express";
import { dbConnection } from "./dBConnection/dBConnection.js";
import { userRouter } from "./src/modules/user/user.routes.js";
import { globalError } from "./src/middleware/globalError.js";
import dotenv from "dotenv";
import cors from "cors";
import { listRouter } from "./src/modules/list/list.routes.js";

const app = express();
const port = 3000;

// use cors to allow frontend
app.use(cors());

// call dotenv
dotenv.config();

app.use(express.json());

// main app routes
app.use("/users", userRouter);
app.use("/lists", listRouter);

// handle unhandled routes
app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`, 404));
});

// error handling middleware
app.use(globalError);

// catch errors outside express
process.on("unhandledRejection", (err) => {
  console.log(err);
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
