import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

export const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UserModel({
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      questions: [],
    });

    const response = await newUser.save();

    return res
      .status(200)
      .json({ message: "New user created", user: response });
  } catch (err) {
    res.status(400).json({ message: "Error in creating user" });
  }
};

export const LOG_IN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect user data" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect user data" });
    }

    const jwt_token = jwt.sign(
      {
        user_name: user.name,
        email: user.email,
        user_id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res
      .status(200)
      .json({ message: "Sign in successful", jwt_token: jwt_token });
  } catch (err) {
    console.log(err);
  }
};
