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
import { AppError } from "./src/middleware/appError.js";

const app = express();
const port = process.env.PORT || 3000;

// use cors to allow frontend
app.use(cors());

// call dotenv
dotenv.config();

app.use(express.json());

// main app routes
app.use("/users", userRouter);
app.use("/lists", listRouter);


// error handling middleware
app.use(globalError);

// handle unhandled routes
app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`, 404));
});

// catch errors outside express
process.on("unhandledRejection", (err) => {
  console.log(err);
});

app.get("/", (req, res) => res.send("Hello World!"));

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
