import express from "express";
import { CreateTableBook, deleteBooking, getAllBookings } from "../controllers/table.controller.js";


const TableRoutes = express.Router();

TableRoutes.post("/create", CreateTableBook);
TableRoutes.get("/get-all", getAllBookings);
TableRoutes.delete("/delete/:id", deleteBooking);

export default TableRoutes