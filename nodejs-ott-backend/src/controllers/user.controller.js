import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import {
    generateToken,
} from "../utils/token.utils.js";

// @desc   Register user
// @route  POST /api/v1/users/register
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({
        email: email,
    });

    if (userExists) {
        // Throws error
        const err = new Error("user already exists");
        err.statusCode = 409;
        throw err;
    }

    // Create the user
    const user = new User({
        name: name,
        email: email,
        password: password,
    });

    await user.save();

    res.status(201).json({
        status: "Success",
        message: "User registered successfully",
        data: user,
    });
});

// @desc   Login user
// @route  POST /api/v1/users/login
// @access Public
export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const userExists = await User.findOne({ email: email });

    if (userExists && await bcrypt.compare(password, userExists?.password)) {
        res.status(200).json({
            status: "Success",
            message: "User logged in successfully",
            token: generateToken(userExists?.id),
        });
    } else {
        const err = new Error("Invalid login credentials");
        err.statusCode = 401;
        throw err;
    }
});

// @desc   Get user profile
// @route  GET /api/v1/users/profile
// @access Private
export const getUserProfilePII = expressAsyncHandler(async (req, res) => {
    if (req.user) {
        res.status(200).json({
            status: "Success",
            message: "User profile retrieved successfully",
            data: req.user,
        });
    } else {
        const err = new Error("getUserProfileController accessed without prior middlewares");
        err.statusCode = 403;
        throw err;
    }
});

// @desc   Update user profile
// @route  PUT /api/v1/users/profile
// @access Private
export const editUserProfilePII = expressAsyncHandler(async (req, res) => {
    if (req.user) {
        // Update user profile fields based on request body
        req.user.name = req.body.name || req.user.name;
        req.user.email = req.body.email || req.user.email;
        req.user.password = req.body.password || req.user.password;

        // Save updated user profile
        const updatedUser = await req.user.save();

        updatedUser.password = undefined    // So that password field is not sent back

        res.status(200).json({
            status: "Success",
            message: "User profile updated successfully",
            data: updatedUser,
        });
    } else {
        const err = new Error("updateUserProfileController accessed without prior middlewares");
        err.statusCode = 403;
        throw err;
    }
});