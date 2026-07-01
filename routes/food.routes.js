import express from "express";
import { createFood, deleteFood, getAllFood, getSingleFood, updateFood } from "../controllers/food.controller.js";

import upload from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";


const FoodRoutes = express.Router();

FoodRoutes.post("/create-food" , isAuthenticated,isAdmin,upload.single("image"), createFood);
FoodRoutes.get("/get-all-food",getAllFood);
FoodRoutes.get("/get-single/:id",getSingleFood);
FoodRoutes.delete("/delete/:id",deleteFood);
FoodRoutes.put("/update/:id",isAuthenticated,isAdmin,upload.single("image"),updateFood);

export default FoodRoutes ;
