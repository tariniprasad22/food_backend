import FoodModel from "../model/food.model.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier"; 
import mongoose from "mongoose";

export const createFood = async (req, res) => {
  try {
    const { name, description, actualPrice, discountPrice } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const uploadImage = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "foods",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadImage();

    const food = await FoodModel.create({
      image: result.secure_url,
      name,
      description,
      actualPrice,
      discountPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Food Created Successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllFood = async (req, res) => {
  try {
    const foods = await FoodModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

export const getSingleFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await FoodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    return res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Food ID",
      });
    }

    const food = await FoodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    await FoodModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, actualPrice, discountPrice } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Food ID",
      });
    }

    const food = await FoodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    let imageUrl = food.image;

    
    if (req.file) {
      const uploadImage = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "foods",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadImage();

      imageUrl = result.secure_url;
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        actualPrice,
        discountPrice,
        image: imageUrl,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Food Updated Successfully",
      food: updatedFood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};
