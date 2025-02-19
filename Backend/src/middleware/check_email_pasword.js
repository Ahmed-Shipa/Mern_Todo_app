import { User } from "../../src/models/user.model.js";
import { AppError } from "./appError.js";
import bcrypt from "bcrypt";

export const check_email_password = async (req, res, next) => {
  // check if email exists
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists)
    return next(new AppError("wrong email", 404, "login endpoint"));

  // check password
  if (!bcrypt.compareSync(req.body.password, userExists.password))
    return next(new AppError("wrong password", 404, "login endpoint"));

  req.user = userExists;
  next();
};
