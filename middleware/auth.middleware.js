import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    const user = await UserModel.findById(decoded.UserId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};