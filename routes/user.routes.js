import express from "express";
import {
  loginUser,
  Logout,
  registerUser,
} from "../controllers/user.controller.js";

const UserRouter = express.Router();


UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/logout", Logout);

export default UserRouter;
