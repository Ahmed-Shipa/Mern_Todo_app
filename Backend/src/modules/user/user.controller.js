import { AppError } from "../../../middleware/appError.js";
import { User } from "../../../models/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// signUp endpoint
const signUp = async (req, res, next) => {
  // check if email exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return next(new AppError("email already exists", 409, "signup endpoint"));

  // add the user
  const users = new User(req.body);
  // hash password
  users.password = bcrypt.hashSync(users.password, Number(process.env.ROUNDS));
  await users.save();
  res.status(200).json({ message: "user added successfully" });
};

// login endpoint
const login = async (req, res, next) => {
  // endpoint starts at check_email_password middleware

  // generate token
  const token = JWT.sign(
    { userId: req.user._id },
    process.env.token_secret_key
  );
  res.json({ message: "login successfully", token });
};

// getUsers endpoint
const getUsers = async (req, res, next) => {
  const users = await User.find().select("-password");
  res.json({ message: users });
};

// update user
const updateUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("user not found", 401, "updateUser endpoint"));
  }
  if (userName) {
    user.userName = userName;
  }
  if (email) {
    // check if email exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return next(
        new AppError("email already exists", 409, "update user endpoint")
      );
    user.email = email;
  }
  if (password) {
    // hash password
    user.password = bcrypt.hashSync(password, Number(process.env.ROUNDS));
  }

  await user.save();
  res.json({ message: "user updated successfully" });
};

// delete user
const deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "user deleted successfully" });
};

export { signUp, login, updateUser, deleteUser, getUsers };
