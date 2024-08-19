import express from "express";

import {
    createContent,
    editContentById,
    deleteContentById,
    getAllContentData,
    getContentById,
} from "../controllers/content.controller.js";

import {
    authorize,
    checkPermissions,
    protect
} from "../middlewares/auth.middleware.js";

import { roleNames } from "../config/roles-and-permissions.config.js";
import upload from "../middlewares/multer.middleware.js";
const { client, manager, admin } = roleNames;

const contentRoutes = express.Router();

// Content routes (All Protected Routes)

// CRUD operations on the database
contentRoutes.get("/view", protect, authorize(client, manager, admin), checkPermissions("view_content"), getAllContentData);
contentRoutes.get("/view/:contentId", protect, authorize(client, manager, admin), checkPermissions("view_content"), getContentById);
contentRoutes.post("/create", protect, authorize(manager, admin), checkPermissions("create_content"), upload.fields([{ name: "poster", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }, { name: "video", maxCount: 1 }]), createContent);
contentRoutes.put("/edit/:contentId", protect, authorize(manager, admin), checkPermissions("edit_content"), upload.fields([{ name: "poster", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }, { name: "video", maxCount: 1 }]), editContentById);
contentRoutes.delete("/delete/:contentId", protect, authorize(manager, admin), checkPermissions("delete_content"), deleteContentById);

export default contentRoutes;