import tableModel from "../model/table.model.js";

export const CreateTableBook = async (req, res) => {
    try {
        const { date, time, name, phone, person } = req.body;

        if (!date || !time || !name || !phone || !person) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const tableData = await tableModel.create({
            date,
            time,
            name,
            phone,
            person,
        });

        return res.status(201).json({
            success: true,
            message: "Table Booked Successfully",
            tableData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await tableModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: bookings.length,
            bookings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const booking = await tableModel.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking Deleted Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
