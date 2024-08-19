import express from "express";

import { roleNames } from "../config/roles-and-permissions.config.js";

import {
    loginUser,
    registerUser,
    getUserProfilePII,
    editUserProfilePII,
} from "../controllers/user.controller.js";

import {
    authorize,
    checkPermissions,
    protect
} from "../middlewares/auth.middleware.js";

const { client, manager, admin } = roleNames;

const userRoutes = express.Router();

// Public routes
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

// Protected routes
userRoutes.get("/profile-pii", protect, authorize(client, manager, admin), checkPermissions('view_own_PII_details'), getUserProfilePII);
userRoutes.put("/profile-pii", protect, authorize(client, manager, admin), checkPermissions('edit_own_PII_details'), editUserProfilePII);

export default userRoutes;