import { User } from "../../src/models/user.model.js";
import { AppError } from "./appError.js";
import { catchError } from "./catchError.js";
import JWT from "jsonwebtoken";

export const protectedRoutes = catchError(async (req, res, next) => {
  let token = req.headers.token;
  let payload = null;

  // verify token
  JWT.verify(token, process.env.token_secret_key, async (err, decoded) => {
    if (err)
      return next(
        new AppError("invalid token", 404, "protectedRoutes middleware")
      );
    payload = decoded;
  });

  // get userid from token
  const user = await User.findById(payload.userId);
  if (!user)
    return next(
      new AppError("user not found", 404, "protectedRoutes middleware")
    );
  req.user = payload;
  next();
});
