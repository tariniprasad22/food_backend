import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        person: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Table", tableSchema);